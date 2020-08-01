require("dotenv").config();
const { MessageEmbed } = require("discord.js");
const { embedLayout } = require("../../utils/constant");

const invite = {
  name: "!invite",
  description: "Invite me to your channel",
  execute: async (msg, args) => {
    const embededMessage = new MessageEmbed()
      .setColor(embedLayout.theme.default)
      .setAuthor(
        process.env.DISCORD_BOT_NAME,
        "https://cdn.discordapp.com/app-icons/730833349928812574/75ff11eaa2a7702b2b0215a1fd05d5a9.png?size=128",
        "https://github.com/vpvnguyen/"
      )
      .setTitle("Click here to invite me")
      .setURL(
        "https://discord.com/api/oauth2/authorize?client_id=730833349928812574&permissions=379968&scope=bot"
      )
      .setDescription(
        "Or copy the link below and paste it into a browser\n```https://discord.com/api/oauth2/authorize?client_id=730833349928812574&permissions=379968&scope=bot```"
      )
      .setFooter(`Created by ${embedLayout.author}`);

    await msg.channel.send(embededMessage);
  },
};

module.exports = invite;
