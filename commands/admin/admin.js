require("dotenv").config();
const role = require("../../config/role");

const admin = {
  name: "!admin",
  description: "Administrative commands",
  execute(msg, args) {
    // check users role; refactor permission function
    if (
      !role.admin.includes(msg.author.username) ||
      msg.author.username !== process.env.ADMIN
    )
      return msg.reply("Denied.");

    console.log("\n--msg.member--");
    console.log(msg.member);
    msg.reply("Admin commands granted");
  },
};

module.exports = admin;
