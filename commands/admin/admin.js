require("dotenv").config();
const role = require("../../config/role");
const axios = require("axios");
const { response } = require("express");

const apiServer = {
  messageHistory: async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/message-history"
      );
      return response.data.message;
    } catch (error) {
      console.error(error.message);
    }
  },
};

const admin = {
  name: "!admin",
  description: "Administrative commands",
  execute: async (msg, args) => {
    try {
      // check users role; refactor permission function
      if (
        !role.admin.includes(msg.author.username) ||
        msg.author.username !== process.env.ADMIN
      )
        return msg.reply("Denied.");

      await msg.reply("Admin commands granted");
      const response = await axios.get("http://localhost:5000/");
      await msg.channel.send(response.data.message);

      const history = await apiServer.messageHistory();
      await msg.channel.send(history);
    } catch (error) {
      console.error(error.message);
      await msg.channel.send(
        "There was an issue connecting to the API server."
      );
    }
  },
};

module.exports = admin;
