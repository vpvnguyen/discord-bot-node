const { MessageEmbed } = require("discord.js");
const dayjs = require("dayjs");
const { embedLayout } = require("../../utils/constant");

const whoAmI = {
  name: "!whoami",
  description: "Get your user and current channel info",
  execute: async (msg, args) => {
    const embededMessage = new MessageEmbed()
      .setColor(embedLayout.theme.default)
      .setThumbnail(embedLayout.user.getIcon(msg.author.id, msg.author.avatar))
      .addFields(
        {
          name: "User",
          value: `Name: ${msg.author.username}#${msg.author.discriminator}`,
        },
        {
          name: `Channel`,
          value: `Name: ${
            msg.channel.guild.name
          }\nOwner: ${msg.channel.guild.member(
            msg.channel.guild.ownerID
          )}\nJoined: ${dayjs(msg.channel.guild.joinedTimestamp).format(
            "MM-DD-YYYY hh:mma"
          )}\nServer Location: ${msg.channel.guild.region}`,
        }
      )
      .setFooter(embedLayout.author);
    await msg.channel.send(embededMessage);
  },
};

module.exports = whoAmI;
