const Self = {
  name: "!self",
  description: "Self-made? self-desctruct?",
  execute(msg, args) {
    msg.reply("selfie?");
    setTimeout(() => {
      return msg.reply("Say... cheeese!");
    }, 500);
  },
};

module.exports = Self;
