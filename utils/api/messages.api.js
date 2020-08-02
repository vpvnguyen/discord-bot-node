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
  saveMessage: async (recordMessage) => {
    // message, channel, has_link, amoun_curse, date user_id
    console.log(recordMessage);
  },
};

module.exports = messagesApi;
