require("dotenv").config();
const { Client, Collection } = require("discord.js");
const { messageContent } = require("./utils/constant");
const botCommands = require("./commands");

const bot = new Client();
bot.commands = new Collection();

bot.on("ready", () => {
  Object.keys(botCommands).map((key) =>
    bot.commands.set(botCommands[key].name, botCommands[key])
  );
  bot.user.setActivity({ name: "!commands", type: "LISTENING" });
  console.info(`Logged in as ${bot.user.tag}`);
});

bot.on("message", async (msg) => {
  if (msg.content.startsWith(messageContent.prefix) && !msg.author.bot)
    return checkCommands(msg);

  if (!msg.author.bot) return record(msg);
});

const record = (msg) => {
  let hasLink = false;
  let amountCurse = 0;

  if (msg.content.match(messageContent.url)) hasLink = true;

  if (hasLink || amountCurse > 0) {
    // pass msg into records
    return console.log("recording message");
  }
};

const checkCommands = (msg) => {
  console.log("check commands");
  const args = msg.content.split(/ +/);
  const command = args.shift().toLowerCase();

  if (!bot.commands.has(command))
    return msg.reply(
      "Huh? You rang? No comprende...\nType `!commands` to see what I can do."
    );

  try {
    bot.commands.get(command).execute(msg, args);
  } catch (error) {
    console.error("Bot on message error:", error.message);
    msg.reply("There was an error trying to execute that command!");
  }
};

bot.login(process.env.DISCORD_BOT_TOKEN);
