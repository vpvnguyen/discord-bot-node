const stupidBot = {
  name: "!stupidbot",
  description: "stupidbot desc",
  execute(msg, args) {
    msg.reply("You want a piece of me?");
    setTimeout(() => {
      return msg.reply("...punk");
    }, 3000);
  },
};

module.exports = stupidBot;
