const Self = {
  name: "!self",
  description: "self desc",
  execute(msg, args) {
    msg.reply("selfie?");
    msg.channel.send("selfie?");
  },
};

module.exports = Self;
