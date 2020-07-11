const shotTime = {
  name: "!whattimeisit",
  description: "shot time desc",
  execute(msg, args) {
    msg.reply("It's...");
    setTimeout(() => {
      return msg.channel.send("SHOT TIME!");
    }, 3000);
  },
};

module.exports = shotTime;
