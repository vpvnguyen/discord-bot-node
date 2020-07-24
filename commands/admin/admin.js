require("dotenv").config();

const admin = {
  name: "!admin",
  description: "Administrative commands",
  execute(msg, args) {
    // check users role
    if (msg.author.username !== process.env.ADMIN) return msg.reply("Denied.");

    console.log("\n--msg.member--");
    console.log(msg.member);
    msg.reply("admin commands");
  },
};

module.exports = admin;
