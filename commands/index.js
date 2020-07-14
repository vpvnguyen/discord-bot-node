const commands = {
  // self
  self: require("./self/self"),
  help: require("./self/help"),
  whoAmI: require("./self/whoAmI"),
  shotTime: require("./self/shotTime"),
  stupidBot: require("./self/stupidBot"),
  // covid
  covid: require("./covid/covid"),
  //   covidCountry: require("./covid/covid.country"),
  //   covidStates: require("./covid/covid.states"),
  //   covidState: require("./covid/covid.state"),
  // commands
  commands: {
    name: "!commands",
    description: () => `[${commands.commands.name}] - List of commands`,
    execute(msg, args) {
      msg.reply("Here is what I can do:");
      msg.channel.send("----------------");
      msg.channel.send(ListOfCommands());
      msg.channel.send("----------------");
      msg.channel.send("Try typing one of these commands!");
    },
  },
};

const ListOfCommands = () => {
  const commandKeys = Object.keys(commands);
  const commandName = commandKeys.map((keys) => {
    return commands[keys].name;
  });

  const sortCommandNames = commandName.sort();
  return [...sortCommandNames];
};

module.exports = commands;
