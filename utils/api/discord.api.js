require("dotenv").config({ path: "../../.env" });
const axios = require("axios");

const baseUrl = `https://discord.com/api`;

const OAuth2Header = {
  headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}` },
};

const discordApi = {
  channel: {
    getChannel: async (channelId) => {
      try {
        const url = `${baseUrl}/channels/${channelId}`;
        const channel = await axios.get(url, OAuth2Header);
        return channel.data;
      } catch (error) {
        console.error(
          "[ERROR] discordApi.channel.getChannel(channelId)",
          error.message
        );
        return `Issue getting channel info.`;
      }
    },
  },
  guild: {
    getGuild: async (guildId) => {
      try {
        const url = `${baseUrl}/guilds/${guildId}`;
        const guild = await axios.get(url, OAuth2Header);
        return guild.data;
      } catch (error) {
        console.error(
          "[ERROR] discordApi.guild.getGuild(guildId)",
          error.message
        );
        return `Issue getting guild info.`;
      }
    },
  },
};

module.exports = discordApi;
