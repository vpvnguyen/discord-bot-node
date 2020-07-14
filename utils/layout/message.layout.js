/*
 * @params msg: discord.js
 * @params data: array
 */

const messageLayout = (data) => {
  return ["----------------", ...data, "----------------"];
};

module.exports = messageLayout;
