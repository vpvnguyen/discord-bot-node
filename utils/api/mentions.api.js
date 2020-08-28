const axios = require("axios");

const mentionsApi = {
  saveMention: async (mention) => {
    const response = await axios.post(
      `http://localhost:5000/api/mentions`,
      mention
    );
    return console.log(response.data);
  },
};

module.exports = mentionsApi;
