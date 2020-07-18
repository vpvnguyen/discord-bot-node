const shotTime = {
  name: "!whattimeisit",
  description: "shot time desc",
  execute(msg, args) {
    msg.reply("It's...");

    setTimeout(() => {
      return msg.reply("Wait for it...");
    }, 800);

    setTimeout(() => {
      return msg.reply("SHOT TIME!");
    }, 2000);
  },
};

module.exports = shotTime;
