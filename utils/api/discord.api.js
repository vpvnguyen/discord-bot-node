require("dotenv").config({ path: "../../.env" });
const axios = require("axios");

const baseUrl = `https://discord.com/api`;

const OAuth2Header = {
  headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}` },
};

const discordApi = {
  user: {
    getCurrentUser: async () => {
      try {
        const url = `${baseUrl}/users/@me`;
        const user = await axios.get(url, OAuth2Header);
        return user.data;
      } catch (error) {
        console.error(
          "[ERROR] discordApi.user.getCurrentUser: ",
          error.message
        );
        return `Issue getting current user.`;
      }
    },
    getUser: async (userId) => {
      try {
        const url = `${baseUrl}/users/${userId}`;
        const user = await axios.get(url, OAuth2Header);
        return user.data;
      } catch (error) {
        console.error(
          "[ERROR] discordApi.user.getUser(userId): ",
          error.message
        );
      }
    },
  },
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
