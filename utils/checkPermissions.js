const axios = require("axios");

const checkPermissions = async (msg) => {
  const [username, discriminator] = msg.split("#");
  const getUserRole = await axios.get(
    `http://localhost:5000/api/user/${username}/${discriminator}`
  );
  return getUserRole.data[0].role;
};

module.exports = checkPermissions;
