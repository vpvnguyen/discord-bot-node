const help = {
  name: "!help",
  description: "Don't know where to start? Use this command!",
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
