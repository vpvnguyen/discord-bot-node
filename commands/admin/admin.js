require("dotenv").config();
const { MessageEmbed } = require("discord.js");
const dayjs = require("dayjs");
const { checkPermission } = require("../../utils/permission");
const { users } = require("../../utils/api/users.api");
const { getLinks } = require("../../utils/api/messages.api");
const getListOfCommands = require("../../utils/getListOfCommands");
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
    run: async (msg) => {
      let countDown = 5;

      msg.channel.send(`Shutting down in ${countDown}...`);

      setInterval(async () => {
        countDown--;
        if (countDown === 0) {
          await msg.channel.send("Goodbye.");
          return process.exit(22);
        }
        return msg.channel.send(`${countDown}...`);
      }, 1000);
    },
  },
  allLinks: {
    name: "links",
    args: "links",
    description: "Get history of all links",
    run: async (msg) => {
      try {
        const links = await getLinks();

        if (links.length === 0) return msg.reply("There were no links found.");

        const embededMessage = new MessageEmbed()
          .setColor(embedLayout.theme.admin)
          .setDescription(
            `There are [${links.length}] link(s) recorded since ${dayjs(
              links[0].date
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
    name: "all-users",
    args: "all-users",
    description: "Retrieve all users info",
    run: async () => {
      try {
        const allUsers = await users.getAllUsers();

        if (allUsers.length === 0)
          return msg.reply("There were no users found.");

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
  updateRole: {
    name: "update-role",
    args: "update-role [userId] [role]",
    description: "Update user's role based on user's ID",
    run: async (params) => {
      try {
        const [userId, role] = params;
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
      }
    },
  },
};

const admin = {
  name: "!admin",
  description: "Administrative commands",
  execute: async (msg, args) => {
    try {
      if (msg.author.bot) return;
      const { username, discriminator } = msg.author;
      const user = await checkPermission(username, discriminator);

      if (user.role !== "admin") return await msg.reply("Access denied.");

      // if there are no args
      if (args < 1) return msg.channel.send(adminCommands.help.run());

      // define args
      const [commandName, ...params] = args;

      // find api command from command name
      let command;
      Object.keys(adminCommands).filter((key) => {
        if (commandName === adminCommands[key].name) {
          return (command = adminCommands[key]);
        }
      });

      const embededMessage = await command.run(params);
      await msg.channel.send(embededMessage);
    } catch (error) {
      console.error(error.message);
      await msg.reply("Invalid command or authentication issue.");
    }
  },
};

module.exports = admin;
