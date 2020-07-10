const shotTime = {
  name: "!whattimeisit",
  description: "shot time desc",
  execute(msg, args) {
    msg.reply("It's shot time");
    msg.channel.send("It's shot time");
  },
};

module.exports = shotTime;
