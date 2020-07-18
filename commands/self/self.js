const Self = {
  name: "!self",
  description: `self description`,
  execute(msg, args) {
    msg.reply("selfie?");
    setTimeout(() => {
      return msg.reply("Say... cheeese!");
    }, 500);
  },
};

module.exports = Self;
