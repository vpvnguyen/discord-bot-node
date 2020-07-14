require("dotenv").config();
const Discord = require("discord.js");
const botCommands = require("./commands");

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

const TOKEN = process.env.DISCORD_BOT_TOKEN;

Object.keys(botCommands).map((key) => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
});

bot.login(TOKEN);

bot.on("ready", () => console.info(`Logged in as ${bot.user.tag}`));

bot.on("message", (msg) => {
  const prefix = "!";
  if (!msg.content.startsWith(prefix)) return;
  console.log("---msg.name---");
  console.log(msg.author.username);
  if (msg.author.username === "sugoi-bot") return;

  const args = msg.content.split(/ +/);
  const command = args.shift().toLowerCase();

  console.log(`msg.content: ${msg.content}`);
  console.log(`args: ${args}`);
  console.info(`Called command: ${command}`);

  if (command === "!kill") {
    exit(msg);
  }

  if (!bot.commands.has(command))
    return msg.reply("Huh? You rang? No comprende...");

  try {
    console.log("BOT COMMANDS GET COMMAND");
    console.log(bot.commands.get(command));
    bot.commands.get(command).execute(msg, args);
  } catch (error) {
    console.error(error);
    msg.reply("there was an error trying to execute that command!");
  }
});

const exit = (msg) => {
  let countDown = 5;
  msg.channel.send(`Shutting down in ${countDown}...`);
  setInterval(() => {
    countDown--;
    console.log(countDown);
    if (countDown === 0) {
      return msg.channel.send("Goodbye.");
    }
    return msg.channel.send(`${countDown}...`);
  }, 1000);

  setTimeout(() => {
    return process.exit(22);
  }, 6000);
};
