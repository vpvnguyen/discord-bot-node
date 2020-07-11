const Self = {
  name: "!self",
  description: `self description`,
  execute(msg, args) {
    msg.reply("selfie?");
    msg.channel.send("selfie?");
  },
};

module.exports = Self;
