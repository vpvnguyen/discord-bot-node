require("dotenv").config();
const { MessageEmbed } = require("discord.js");
const { embedLayout } = require("../../utils/constant");
const { users } = require("../../utils/api/users.api");

const addMe = {
  name: "!addme",
  description: `Adds your user info to ${process.env.DISCORD_BOT_NAME}'s database`,
  execute: async (msg, args) => {
    try {
      if (msg.author.bot) return;

      const currentUser = await users.addMe(msg.author);
      console.log(currentUser);

      const embededMessage = new MessageEmbed()
        .setColor(embedLayout.theme.default)
        .setThumbnail(
          embedLayout.user.getIcon(currentUser.user_id, msg.author.avatar)
        )
        .setDescription(`User has been added!`)
        .addFields({
          name: `${currentUser.username}#${currentUser.discriminator}`,
          value: `ID: ${currentUser.user_id}\nRole: ${currentUser.role}`,
        })
        .setFooter(embedLayout.author);
      await msg.channel.send(embededMessage);
    } catch (error) {
      await msg.reply("Current user already added or issue with the server");
    }
  },
};

module.exports = addMe;
