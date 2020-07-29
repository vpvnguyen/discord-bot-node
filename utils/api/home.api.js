const axios = require("axios");

const homeApi = {
  home: async () => {
    try {
      const response = await axios.get("http://localhost:5000/");
      return response.data.message;
    } catch (error) {
      console.error(error.message);
    }
  },
};

module.exports = homeApi;
