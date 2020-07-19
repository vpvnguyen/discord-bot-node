const whoAmI = {
  name: "!whoami",
  description: "I am, who I say I am",
  execute(msg, args) {
    msg.reply("I am sugoisauce's bot. Beep Boop.");
  },
};

module.exports = whoAmI;
