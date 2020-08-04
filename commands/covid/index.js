const covidCommands = require("./covid");
const { findCommand } = require("../../utils/command.util");

const covid = {
  name: "!covid",
  description: "Covid data by command",
  execute: async (msg, args) => {
    try {
      if (args < 1) return msg.channel.send(covidCommands.help.run());

      const commandName = args[0];
      const param = `${args[1]} ${args[2] ? args[2] : ""}`;

      const command = findCommand(commandName, covidCommands);

      const embededMessage = await command.run(param);
      await msg.channel.send(embededMessage);
    } catch (error) {
      console.error(error.message);
    }
  },
};

module.exports = covid;
