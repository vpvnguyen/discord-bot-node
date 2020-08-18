const { MessageEmbed } = require("discord.js");
const dayjs = require("dayjs");
const { users } = require("../../utils/api/users.api");
const {
  getLinks,
  getLinksByChannel,
  getLinksByUsername,
} = require("../../utils/api/messages.api");
const { getListOfCommands } = require("../../utils/command.util");
const { embedLayout, roles } = require("../../utils/constant");
const {
  user: { getUser },
  channel: { getChannel },
  guild: { getGuild },
} = require("../../utils/api/discord.api");

const adminCommands = {
  help: {
    name: "help",
    args: "help",
    description: "Admin help",
    run: () => {
      const listOfCommands = getListOfCommands(adminCommands);

      const embededMessage = new MessageEmbed()
        .setColor(embedLayout.theme.admin)
        .setDescription(`List of admin commands:`)
        .addFields({
          name: "\u200B",
          value: listOfCommands.map(
            (command) =>
              `\`!admin ${command.args}\`\n • ${command.description}\n`
          ),
        })
        .setFooter(embedLayout.author);

      return embededMessage;
    },
  },
  kill: {
    name: "kill",
    args: "kill",
    description: "Kill bot process",
    run: () => {
      const exit = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(process.exit(22));
        }, 1000);
      });

      try {
        exit.then((exit) => exit);
        return `Goodbye...`;
      } catch (error) {
        console.error(error.message);
        return `There was an issue killing bot process.`;
      }
    },
  },
  allLinks: {
    name: "links",
    args: "links",
    description: "Get history of all links",
    run: async () => {
      try {
        const links = await getLinks();

        if (links.length === 0) return `There were no links found`;

        const embededMessage = new MessageEmbed()
          .setColor(embedLayout.theme.admin)
          .setDescription(
            `There are [${links.length}] link(s) recorded since ${dayjs(
              links[links.length - 1].date
            ).format("MM-DD-YYYY hh:mma")}`
          )
          .addFields(
            links.map((value) => {
              return {
                name: `${value.username}#${value.discriminator} | ${value.channel}`,
                value: `${value.message}\n${dayjs(value.date).format(
                  "MM-DD-YYYY hh:mma"
                )}`,
              };
            })
          )
          .setFooter(`Timezone is GMT | ${embedLayout.author}`);
        return embededMessage;
      } catch (error) {
        console.error(error.message);
        return `Issue getting all links.`;
      }
    },
  },
  getAllUsers: {
    name: "users",
    args: "users",
    description: "Retrieve all users info",
    run: async () => {
      try {
        const allUsers = await users.getAllUsers();

        if (allUsers.length === 0) return `There were no users found`;

        const embededMessage = new MessageEmbed()
          .setColor(embedLayout.theme.admin)
          .setDescription(`There are [${allUsers.length}] user(s)`)
          .addFields(
            allUsers.map((value) => {
              return {
                name: `${value.username}#${value.discriminator}`,
                value: `ID: ${value.id}\nuser_id: ${value.user_id}\nRole: ${value.role}`,
              };
            })
          )
          .setFooter(`Timezone is GMT | ${embedLayout.author}`);

        return embededMessage;
      } catch (error) {
        console.error(error.message);
        return `Issue getting all users.`;
      }
    },
  },
  updateRole: {
    name: "update-role",
    args: "update-role [userId] [role]",
    description: "Update user's role based on user's ID",
    run: async (params) => {
      const [userId, role] = params;
      try {
        if (!roles.includes(role)) return `Invalid role. Options: [${roles}]`;
        const newUserRole = await users.updateRole(userId, role);

        const embededMessage = new MessageEmbed()
          .setColor(embedLayout.theme.admin)
          .setDescription(
            `Updated ${newUserRole.username}#${newUserRole.discriminator}'s role!`
          )
          .addFields({
            name: `${newUserRole.username}#${newUserRole.discriminator}`,
            value: `ID: ${newUserRole.id}\nuser_id: ${newUserRole.user_id}\nRole: ${newUserRole.role}`,
          })
          .setFooter(embedLayout.author);

        return embededMessage;
      } catch (error) {
        console.error(error.message);
        return `There was an issue updating user ID ${userId} to ${role}.`;
      }
    },
  },
  getAllLinksByUsername: {
    name: "links-user",
    args: "links-user [username]",
    description: "Retrieve links by username",
    run: async (params) => {
      const [username] = params;
      try {
        const links = await getLinksByUsername(username);
        if (links.length === 0) return `No links found from ${username}.`;
        const { user_id } = links[0];
        const { avatar } = await getUser(user_id);

        const embededMessage = new MessageEmbed()
          .setColor(embedLayout.theme.admin)
          .setThumbnail(embedLayout.user.getIcon(user_id, avatar))
          .setDescription(
            `There are [${links.length}] link(s) recorded since ${dayjs(
              links[links.length - 1].date
            ).format("MM-DD-YYYY hh:mma")}`
          )
          .addFields(
            links.map((value) => {
              return {
                name: `${value.username}#${value.discriminator} | ${value.channel}`,
                value: `${value.message}\n${dayjs(value.date).format(
                  "MM-DD-YYYY hh:mma"
                )}`,
              };
            })
          )
          .setFooter(`Timezone is GMT | ${embedLayout.author}`);
        return embededMessage;
      } catch (error) {
        console.error(error.message);
        return `Issue getting links from ${username}.`;
      }
    },
  },
  getLinkByChannel: {
    name: "links-channel",
    args: "links-channel [channel_name]",
    description: "Retrieve links by channel",
    run: async (channel) => {
      const channelName = channel.join(",").replace(/,/g, " ");

      try {
        const linksByChannel = await getLinksByChannel(channelName);
        const { channel_id } = linksByChannel[0];
        const { icon } = await getGuild(channel_id);

        if (linksByChannel.length === 0)
          return `There were no links found from [${channelName}]`;

        const embededMessage = new MessageEmbed()
          .setColor(embedLayout.theme.admin)
          .setThumbnail(embedLayout.guild.getIcon(channel_id, icon))
          .setDescription(
            `There are [${
              linksByChannel.length
            }] link(s) recorded in ${channelName} since ${dayjs(
              linksByChannel[linksByChannel.length - 1].date
            ).format("MM-DD-YYYY hh:mma")}`
          )
          .addFields(
            linksByChannel.map((value) => {
              return {
                name: `${value.username}#${value.discriminator} | ${value.channel}`,
                value: `${value.message}\n${dayjs(value.date).format(
                  "MM-DD-YYYY hh:mma"
                )}`,
              };
            })
          )
          .setFooter(`Timezone is GMT | ${embedLayout.author}`);

        return embededMessage;
      } catch (error) {
        console.error(error.message);
        return `There was an issue getting links from channel [${channelName}]`;
      }
    },
  },
  getUserByUsername: {
    name: "get-user",
    args: "get-user [username#tag]",
    description: "Get discord user's info by username#tag",
    run: async (params) => {
      try {
        const [username, discriminator] = params[0].split("#");
        const user = await users.getUserByUsername(username, discriminator);
        console.log(user);
        // TODO
        return `Got it!`;
      } catch (error) {
        console.error(error.message);
        return `There was an issue getting user's info.`;
      }
    },
  },
  getUserById: {
    name: "get-userid",
    args: "get-userid [userId]",
    description: "Get discord user's info by user's ID",
    run: async (userId) => {
      try {
        const discordUserData = await getUser(userId);
        const { id, username, discriminator, avatar } = discordUserData;

        const embededMessage = new MessageEmbed()
          .setColor(embedLayout.theme.admin)
          .setThumbnail(embedLayout.user.getIcon(id, avatar))
          .addFields({
            name: "User",
            value: `Name: ${username}#${discriminator}`,
          })
          .setFooter(embedLayout.author);

        return embededMessage;
      } catch (error) {
        console.error(error.message);
        return `There was an issue getting user's discord info.`;
      }
    },
  },
  getGuild: {
    name: "get-guild",
    args: "get-guild [guild id]",
    description: "Retrieve guild information",
    run: async (guildId) => {
      try {
        const guildData = await getGuild(guildId);

        const {
          id,
          name,
          icon,
          owner_id,
          roles,
          explicit_content_filter,
          max_members,
          premium_tier,
        } = guildData;

        const embededMessage = new MessageEmbed()
          .setColor(embedLayout.theme.admin)
          .setTitle(`${name} | ID: ${id}`)
          .setDescription(
            `icon: ${icon} | owner_id: ${owner_id} | roles ${roles} | explicit: ${explicit_content_filter} | maxMembers: ${max_members} | premiumTier: ${premium_tier}`
          )
          .addFields({
            name: `name`,
            value: `value`,
          })
          .setFooter(embedLayout.author);

        return embededMessage;
      } catch (error) {
        console.error(error.message);
        return `Issue getting guild data from ID: ${guildId}`;
      }
    },
  },
  getChannel: {
    name: "get-channel",
    args: "get-channel [channel id]",
    description: "Retrieve channel information",
    run: async (channelId) => {
      try {
        const channelData = await getChannel(channelId);

        const {
          id,
          last_message_id,
          name,
          parent_id,
          guild_id,
          nsfw,
        } = channelData;

        const embededMessage = new MessageEmbed()
          .setColor(embedLayout.theme.admin)
          .setTitle(name)
          .setDescription(name)
          .addFields({
            name: `ID: ${id} | lastMessageID: ${last_message_id} | parentID: ${parent_id} | guildID: ${guild_id} | nsfw: ${nsfw}`,
            value: `value`,
          })
          .setFooter(embedLayout.author);

        return embededMessage;
      } catch (error) {
        console.error(error.message);
        return `Issue getting channel data from ID: ${channelId}`;
      }
    },
  },
};

module.exports = adminCommands;
