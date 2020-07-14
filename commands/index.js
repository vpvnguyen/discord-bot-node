const messageLayout = require("../utils/layout/message.layout");

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
      const formattedMessage = messageLayout(listOfCommands);
      msg.channel.send(formattedMessage);
      msg.channel.send("Try typing one of these commands!");
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
