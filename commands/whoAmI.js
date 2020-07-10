const whoAmI = {
  name: "!whoami",
  description: "whoami desc",
  execute(msg, args) {
    msg.reply("I am sugoisauce's bot. Beep Boop.");
    msg.channel.send("I am sugoisauce's bot. Beep Boop.");
  },
};

module.exports = whoAmI;
