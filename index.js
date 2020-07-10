require("dotenv").config();
const Discord = require("discord.js");
const botCommands = require("./commands");

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

const TOKEN = process.env.DISCORD_BOT_TOKEN;

Object.keys(botCommands).map((key) => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
  console.log(botCommands);
  console.log(botCommands[key].name, botCommands[key]);
});

bot.login(TOKEN);

bot.on("ready", () => console.info(`Logged in as ${bot.user.tag}`));

bot.on("message", (msg) => {
  const args = msg.content.split(/ +/);
  console.log(`args: ${args}`);
  const command = args.shift().toLowerCase();
  console.info(`Called command: ${command}`);
  console.log(`bot.commands`, bot.commands);

  if (!bot.commands.has(command)) return;

  try {
    console.log(`bot.commands`, bot.commands);
    bot.commands.get(command).execute(msg, args);
  } catch (error) {
    console.error(error);
    msg.reply("there was an error trying to execute that command!");
  }
});