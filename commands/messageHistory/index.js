const { MessageEmbed } = require("discord.js");
const dayjs = require("dayjs");
const { embedLayout } = require("../../utils/constant");
const { getLinksByChannelId } = require("../../utils/api/messages.api");

const links = {
  name: "!links",
  description: "Retrieve channel's message history containing links",
  execute: async (msg, args) => {
    const channelLinks = await getLinksByChannelId(msg.channel.guild.id);

    if (channelLinks.length === 0)
      return msg.reply(
        `There are no links found for ${msg.channel.guild.name}`
      );

    const embedMessage = new MessageEmbed()
      .setColor(embedLayout.theme.history)
      .setThumbnail(
        embedLayout.guild.getIcon(msg.channel.guild.id, msg.channel.guild.icon)
      )
      .setDescription(
        `Found ${channelLinks.length} link(s) from ${msg.channel.guild.name}`
      )
      .addFields(
        channelLinks.map((value) => {
          return {
            name: `${value.username}#${value.discriminator} | ${dayjs(
              value.date
            ).format("MM-DD-YYYY hh:mma")}`,
            value: `${value.message}`,
          };
        })
      )
      .setFooter(`Timezone is GMT | ${embedLayout.author}`);

    await msg.channel.send(embedMessage);
  },
};

module.exports = links;
