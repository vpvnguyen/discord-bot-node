const help = {
  name: "!help",
  description: "help desc",
  execute(msg, args) {
    msg.reply("Need some help?");
    msg.channel.send("Need some help?");
  },
};

module.exports = help;
