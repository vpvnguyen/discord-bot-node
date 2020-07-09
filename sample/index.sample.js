require("dotenv").config();
const Discord = require("discord.js");
const bot = new Discord.Client();
const TOKEN = process.env.DISCORD_BOT_TOKEN;

bot.login(TOKEN);

bot.on("ready", () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on("message", (msg) => {
  if (msg.content === "ping") {
    msg.reply("pong"); // tags the initial user who has sent the message
    msg.channel.send("pong"); // ends a message to the channel without tagging anyone
  } else if (msg.content.startsWith("!kick")) {
    if (msg.mentions.users.size) {
      const taggedUser = msg.mentions.users.first();
      msg.channel.send(`You wanted to kick: ${taggedUser.username}`);
    } else {
      msg.reply("Please tag a valid user!");
    }
  }
});
