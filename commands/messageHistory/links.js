const { MessageEmbed } = require("discord.js");
const { embedLayout } = require("../../utils/constant");

const links = {
  name: "!links",
  description: "Retrieve message history of links",
  execute: async (msg, args) => {
    const embedMessage = new MessageEmbed()
      .setColor(embedLayout.theme.default)
      .setDescription(`${msg.channel.guild.name} link history`)
      .addFields({
        name: "Get Link",
        value: "Get Link",
      })
      .setFooter(embedLayout.author);

    await msg.channel.send(embedMessage);
  },
};

module.exports = links;
