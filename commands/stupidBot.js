const stupidBot = {
  name: "!stupidbot",
  description: "stupidbot desc",
  execute(msg, args) {
    msg.reply("You want a piece of me, punk?");
    msg.channel.send("You want a piece of me, punk?");
  },
};

module.exports = stupidBot;
