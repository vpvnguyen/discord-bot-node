const { checkRole } = require("../utils/api/users.api");

let cachedUsers = [];

const checkPermission = async (username, discriminator) => {
  // check if user is cached
  const user = `${username}#${discriminator}`;
  const cachedUser = cachedUsers.filter((value) => user === value.name);

  // if user is cached, return user
  if (cachedUser.length > 0) return cachedUser[0];

  // if user is not cached, check DB for user's role
  try {
    const userRole = await checkRole(username, discriminator);

    // if user exists in DB, cache user
    cachedUsers.push({ name: user, role: userRole });
    return { name: user, role: userRole };
  } catch (error) {
    // if user does not exist in DB, reject
    return { name: null, role: null };
  }
};

module.exports = checkPermission;
