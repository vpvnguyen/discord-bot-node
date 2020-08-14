const { MessageEmbed } = require("discord.js");
const dayjs = require("dayjs");
const { users } = require("../../utils/api/users.api");
const { getLinks, getLinksByChannel } = require("../../utils/api/messages.api");
const { getListOfCommands } = require("../../utils/command.util");
const { embedLayout } = require("../../utils/constant");

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

      exit.then((exit) => exit);
      return `Goodbye...`;
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
      }
    },
  },
  getLinkByChannel: {
    name: "links-channel",
    args: "links-channel [channel_name]",
    description: "Retrieve links by channel",
    run: async (channel) => {
      try {
        const linksByChannel = await getLinksByChannel(channel);

        const embededMessage = new MessageEmbed()
          .setColor(embedLayout.theme.admin)
          .setDescription(
            `There are [${
              linksByChannel.length
            }] link(s) recorded in ${channel} since ${dayjs(
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
        return `Could not find links from channel [${channel}]`;
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
        return `Could not update-role of ${userId}`;
      }
    },
  },
};

module.exports = adminCommands;
