const axios = require("axios");

const messagesApi = {
  getLinks: async () => {
    const links = await axios.get(`http://localhost:5000/api/links`);
    return links.data;
  },
  getLinksByChannel: async (channel) => {
    const linksByChannel = await axios.get(
      `http://localhost:5000/api/links/channel/${channel}`
    );
    return linksByChannel.data;
  },
  getLinksByChannelId: async (channelId) => {
    const linksByChannelId = await axios.get(
      `http://localhost:5000/api/links/channel/id/${channelId}`
    );
    return linksByChannelId.data;
  },
  getLinksByUsername: async (username) => {
    const linksByUsername = await axios.get(
      `http://localhost:5000/api/links/username/${username}`
    );
    return linksByUsername.data;
  },
  saveMessage: async (recordMessage) => {
    const message = await axios.post(
      "http://localhost:5000/api/message",
      recordMessage
    );
    return console.log(message.data);
  },
};

module.exports = messagesApi;
