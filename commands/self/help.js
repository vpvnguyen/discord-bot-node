const help = {
  name: "!help",
  description: "help desc",
  execute(msg, args) {
    msg.reply("Need some help?");
    setTimeout(() => {
      return msg.reply(
        "There's a lot of things I can do... Try typing in `!commands`"
      );
    }, 500);
  },
};

module.exports = help;
