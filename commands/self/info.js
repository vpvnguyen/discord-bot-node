const { MessageEmbed } = require("discord.js");
const { embedLayout } = require("../../utils/constant");

const info = {
  name: "!info",
  description: "Bot information",
  execute: async (msg, args) => {
    const embedMessage = new MessageEmbed()
      .setColor(embedLayout.theme.default)
      .setTitle("I AM SUGOI-BOT!")
      .setDescription("The most sugoi-est bot at your service! Beep Boop.")
      .addFields(
        {
          name: "Want to contribute?",
          value:
            "Visit https://www.github.com/vpvnguyen/discord-bot-node to make me better!",
        },
        {
          name: "Am I broken? Please let my author know!",
          value: "https://github.com/vpvnguyen/discord-bot-node/issues/new",
        }
      )
      .setFooter(embedLayout.author);

    await msg.channel.send(embedMessage);
  },
};

module.exports = info;
