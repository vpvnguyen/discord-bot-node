require("dotenv").config();
const { Client, Collection } = require("discord.js");
const botCommands = require("./commands");

const bot = new Client();
bot.commands = new Collection();

Object.keys(botCommands).map((key) => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
});

bot.on("ready", () => {
  bot.user.setActivity({ name: "!commands", type: "LISTENING" });
  console.info(`Logged in as ${bot.user.tag}`);
});

bot.on("message", (msg) => {
  if (isNotValidCommand(msg)) return;

  const { command, args } = defineInput(msg);

  if (commandDoesNotExist(command)) {
    return msg.reply(
      "Huh? You rang? No comprende...\nType `!commands` to see what I can do."
    );
  }

  try {
    bot.commands.get(command).execute(msg, args);
  } catch (error) {
    console.error("Bot on message error:", error.message);
    msg.reply("There was an error trying to execute that command!");
  }
});

bot.login(process.env.DISCORD_BOT_TOKEN);

const isNotValidCommand = (msg) => {
  const prefix = "!";
  if (
    !msg.content.startsWith(prefix) ||
    msg.author.username === (process.env.DISCORD_BOT_NAME || "sugoi-bot")
  )
    return true;
};

const defineInput = (msg) => {
  const args = msg.content.split(/ +/);
  const command = args.shift().toLowerCase();
  return {
    command,
    args,
  };
};

const commandDoesNotExist = (command) => {
  if (command === "!kill") {
    exit(msg);
  }

  if (!bot.commands.has(command)) return true;

  return false;
};

const exit = (msg) => {
  let countDown = 5;

  msg.channel.send(`Shutting down in ${countDown}...`);

  setInterval(() => {
    countDown--;
    if (countDown === 0) {
      return msg.channel.send("Goodbye.");
    }
    return msg.channel.send(`${countDown}...`);
  }, 1000);

  setTimeout(() => {
    return process.exit(22);
  }, 6000);
};
