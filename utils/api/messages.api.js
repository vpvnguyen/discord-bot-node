const axios = require("axios");

const messagesApi = {
  getLinks: async () => {
    const links = await axios.get(`http://localhost:5000/api/links`);
    return links.data;
  },
  getLinksByChannel: async (channel) => {
    const linksByChannel = await axios.get(
      `http://localhost:5000/api/links/${channel}`
    );
    return linksByChannel.data;
  },
};

module.exports = messagesApi;
