require("dotenv").config();
const { checkRole } = require("../../utils/api/users.api");
const { home } = require("../../utils/api/home.api");

const admin = {
  name: "!admin",
  description: "Administrative commands",
  execute: async (msg, args) => {
    try {
      const { username, discriminator } = msg.author;
      const userRole = await checkRole(username, discriminator);

      if (userRole !== "admin") return msg.reply("Denied.");

      await msg.reply("Admin commands granted");

      const homeMessage = await home();

      await msg.channel.send(homeMessage);
    } catch (error) {
      console.error(error.message);
      await msg.reply("There was an issue connecting to the API server.");
    }
  },
};

module.exports = admin;
