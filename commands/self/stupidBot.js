const stupidBot = {
  name: "!stupidbot",
  description: "Do you even like yourself?",
  execute(msg, args) {
    msg.reply("You want a piece of me?");
    setTimeout(() => {
      return msg.reply("...punk");
    }, 3000);
  },
};

module.exports = stupidBot;
