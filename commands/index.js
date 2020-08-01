const { MessageEmbed } = require("discord.js");
const getListOfCommands = require("../utils/getListOfCommands");
const { embedLayout } = require("../utils/constant");

const commands = {
  // self
  info: require("./self/info"),
  help: require("./self/help"),
  whoAmI: require("./self/whoAmI"),
  shotTime: require("./self/shotTime"),
  stupidBot: require("./self/stupidBot"),
  invite: require("./self/invite"),
  // covid
  covid: require("./covid/covid"),
  // admin
  admin: require("./admin/admin"),
  // commands
  commands: {
    name: "!commands",
    description: "List of commands",
    execute(msg, args) {
      const listOfCommands = getListOfCommands(commands);

      const embededMessage = new MessageEmbed()
        .setColor(embedLayout.theme.default)
        .setDescription(`Here is what I can do:`)
        .addFields({
          name: "\u200B",
          value: listOfCommands.map(
            (command) => `\`${command.name}\`\n • ${command.description}\n`
          ),
        })
        .addFields({
          name: "\u200B",
          value: "Try typing in one of these commands!\nExample: `!covid`",
        })
        .setFooter(embedLayout.author);

      msg.channel.send(embededMessage);
    },
  },
};

module.exports = commands;
