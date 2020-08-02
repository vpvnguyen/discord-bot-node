const axios = require("axios");

const messagesApi = {
  getLinks: async () => {
    const links = await axios.get(`http://localhost:5000/api/links`);
    return links.data;
  },
  getLinksByChannel: async (channelId) => {
    const linksByChannel = await axios.get(
      `http://localhost:5000/api/links/${channelId}`
    );
    return linksByChannel.data;
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
