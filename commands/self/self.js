const Self = {
  name: "!self",
  description: `self description`,
  execute(msg, args) {
    msg.reply("selfie?");
  },
};

module.exports = Self;
