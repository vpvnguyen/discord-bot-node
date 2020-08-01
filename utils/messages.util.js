const messagesUtil = {
  defineInput: (msg) => {
    const args = msg.content.split(/ +/);
    const command = args.shift().toLowerCase();
    return {
      command,
      args,
    };
  },
  doesNotContainCommand: (msg) => {
    const prefix = "!";
    if (!msg.content.startsWith(prefix) || msg.author.bot) return true;
  },
  commandDoesNotExist: (bot, command) => {
    if (!bot.commands.has(command)) return true;
    return false;
  },
};
module.exports = messagesUtil;
