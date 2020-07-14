const help = {
  name: "!help",
  description: "help desc",
  execute(msg, args) {
    msg.reply("Need some help?");
    setTimeout(() => {
      return msg.channel.send(
        "Try typing in `!commands` until my owner gives me smarter instructions"
      );
    }, 1000);
  },
};

module.exports = help;
