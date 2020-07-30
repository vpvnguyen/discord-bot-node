require("dotenv").config();
const checkPermission = require("../../utils/checkPermission");

const admin = {
  name: "!admin",
  description: "Administrative commands",
  execute: async (msg, args) => {
    try {
      const { username, discriminator } = msg.author;
      const user = await checkPermission(username, discriminator);

      if (user.role !== "admin") return await msg.reply("Access denied.");

      await msg.reply("Admin commands granted");
    } catch (error) {
      console.error(error.message);
      await msg.reply("There was an issue connecting to the API server.");
    }
  },
};

module.exports = admin;
