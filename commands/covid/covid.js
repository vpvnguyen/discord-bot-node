const covid = {
  name: "!covid",
  description: "covid desc",
  execute(msg, args) {
    msg.reply("I can't do that yet. My owner is working on it.");
    msg.channel.send("I can't do that yet. My owner is working on it.");
  },
};

module.exports = covid;
