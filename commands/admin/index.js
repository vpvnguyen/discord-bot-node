const adminCommands = require("./admin");
const { checkPermission } = require("../../utils/permission.util");
const { findCommand } = require("../../utils/command.util");

const admin = {
  name: "!admin",
  description: "Administrative commands",
  execute: async (msg, args) => {
    try {
      if (msg.author.bot) return;

      const { username, discriminator } = msg.author;
      const user = await checkPermission(username, discriminator);

      if (user.role !== "admin") return await msg.reply("Access denied.");
      if (args < 1) return msg.channel.send(adminCommands.help.run());

      const [commandName, ...params] = args;
      const command = findCommand(commandName, adminCommands);
      const embededMessage = await command.run(params);

      await msg.channel.send(embededMessage);
    } catch (error) {
      console.error(error.message);
      await msg.reply("Invalid command or authentication issue.");
    }
  },
};

module.exports = admin;
