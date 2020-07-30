const { checkRole } = require("../utils/api/users.api");

const permission = {
  cachedUsers: [],
  checkPermission: async (username, discriminator) => {
    const user = `${username}#${discriminator}`;

    // if user is cached, return user
    const cachedUser = permission.cachedUsers.filter(
      (value) => user === value.name
    );
    if (cachedUser.length > 0) return cachedUser[0];

    try {
      // if user is not cached, check DB for user's role
      const userRole = await checkRole(username, discriminator);

      // if user exists in DB, cache user
      permission.cachedUsers.push({ name: user, role: userRole });

      return { name: user, role: userRole };
    } catch (error) {
      // if user does not exist in DB, reject
      return { name: null, role: null };
    }
  },
};

module.exports = permission;
