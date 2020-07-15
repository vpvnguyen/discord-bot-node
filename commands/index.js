const Discord = require("discord.js");

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
    description: () => `[${commands.commands.name}] - List of commands`,
    execute(msg, args) {
      msg.reply("Here is what I can do:");
      const listOfCommands = getListOfCommands();
      msg.channel.send(listOfCommands);
      msg.channel.send("Try typing one of these commands!");
    },
  },
  // embed example
  embed: {
    name: "!embed",
    execute(msg, args) {
      const exampleEmbed = new Discord.MessageEmbed()
        .setColor("#76D7C4")
        .setTitle("Title")
        .setURL("https://discord.js.org/")
        .setAuthor(
          "Author name",
          "https://i.imgur.com/wSTFkRM.png",
          "https://discord.js.org"
        )
        .setDescription("Some description here")
        .setThumbnail("https://i.imgur.com/wSTFkRM.png")
        .addFields(
          { name: "Regular field title", value: "Regular value here" },
          { name: "\u200B", value: "\u200B" },
          {
            name: "Inline field title",
            value: "Inline value here",
            inline: true,
          },
          {
            name: "Inline field title 2",
            value: "Inline value here 2",
            inline: true,
          }
        )
        .addField("Inline field title 3", "Inline value here 3", true)
        .setImage("https://i.imgur.com/wSTFkRM.png")
        .setTimestamp()
        .setFooter("Footer text here", "https://i.imgur.com/wSTFkRM.png");

      msg.channel.send(exampleEmbed);
    },
  },
};

const getListOfCommands = () => {
  const commandKeys = Object.keys(commands);
  const commandNames = commandKeys.map((keys) => {
    return commands[keys].name;
  });

  const sortCommandNames = commandNames.sort();
  return sortCommandNames;
};

module.exports = commands;
