const axios = require("axios");

const usersApi = {
  users: {
    getAllUsers: async () => {
      const users = await axios.get(`http://localhost:5000/api/users`);
      return users.data;
    },
    getUserById: async (userId) => {
      const user = await axios.get(`http://localhost:5000/api/user/${userId}`);
      return user.data[0];
    },
    updateRole: async (userId, role) => {
      const updateRole = await axios.put(
        `http://localhost:5000/api/user/update-role`,
        { userId, role }
      );
      return updateRole.data[0];
    },
    deleteByUserId: async (userId) => {
      const deleteUserByUserId = await axios.delete(
        `http://localhost:5000/api/user/${userId}`
      );
      return deleteUserByUserId.message;
    },
    checkRole: async (username, discriminator) => {
      const user = await axios.get(
        `http://localhost:5000/api/user/${username}/${discriminator}`
      );
      return user.data[0];
    },
  },
};

module.exports = usersApi;
