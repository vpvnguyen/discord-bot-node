const whoAmI = {
  name: "!whoami",
  description: "I am, who I say I am",
  execute(msg, args) {
    msg.reply(
      "I am sugoisauce's bot. Beep Boop.\nVisit github.com/vpvnguyen/discord-bot-node to help contribute!"
    );
  },
};

module.exports = whoAmI;
