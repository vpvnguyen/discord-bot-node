const { MessageEmbed } = require("discord.js");
const getListOfCommands = require("../utils/getListOfCommands");

const layout = {
  author: "github.com/vpvnguyen",
  theme: `#6897bb`,
  footer: () => layout.author,
  newLine: {
    name: "\u200B",
    value: "\u200B",
    inline: true,
  },
};

const commands = {
  // self
  self: require("./self/self"),
  help: require("./self/help"),
  whoAmI: require("./self/whoAmI"),
  shotTime: require("./self/shotTime"),
  stupidBot: require("./self/stupidBot"),
  // covid
  covid: require("./covid/covid"),
  // commands
  commands: {
    name: "!commands",
    description: "List of commands",
    execute(msg, args) {
      const listOfCommands = getListOfCommands(commands);

      const embededMessage = new MessageEmbed()
        .setColor(layout.theme)
        .setDescription(`Here is what I can do:`)
        .addFields({
          name: "\u200B",
          value: listOfCommands.map((command) => `${command.name}`),
        })
        .addFields({
          name: "\u200B",
          value: "Try typing in one of these commands!\nExample: `!covid`",
        })
        .setFooter(layout.footer());

      msg.channel.send(embededMessage);
    },
  },
};

module.exports = commands;
