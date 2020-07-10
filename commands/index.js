const commands = {
  // self
  self: require("./self/self"),
  help: require("./self/help"),
  whoAmI: require("./self/whoAmI"),
  shotTime: require("./self/shotTime"),
  stupidBot: require("./self/stupidBot"),
  // covid
  covid: require("./covid/covid"),
};

console.log(`
    All Commands
    ${JSON.stringify(commands)}
`);

module.exports = commands;
