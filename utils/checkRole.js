const axios = require("axios");

const checkRole = async (username, discriminator) => {
  // const userRole = await apiServer.userRole.run(username, discriminator);
  const getUserRole = await axios.get(
    `http://localhost:5000/api/user/${username}/${discriminator}`
  );
  console.log(getUserRole.data[0].role);
  return getUserRole.data[0].role;
};

module.exports = checkRole;
