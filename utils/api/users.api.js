const axios = require("axios");

const usersApi = {
  checkRole: async (username, discriminator) => {
    const user = await axios.get(
      `http://localhost:5000/api/user/${username}/${discriminator}`
    );
    return user.data[0].role;
  },
};

module.exports = usersApi;
