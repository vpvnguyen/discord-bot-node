require("dotenv").config();
const { Client, Collection, MessageEmbed } = require("discord.js");
const {
  doesNotContainCommand,
  defineInput,
  commandDoesNotExist,
} = require("./utils/messages.util");
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
  // console.log(msg);
  // recorder
  if (doesNotContainCommand(msg)) return;

  const { command, args } = defineInput(msg);

  if (commandDoesNotExist(bot, command))
    return msg.reply(
      "Huh? You rang? No comprende...\nType `!commands` to see what I can do."
    );

  try {
    bot.commands.get(command).execute(msg, args);
  } catch (error) {
    console.error("Bot on message error:", error.message);
    msg.reply("There was an error trying to execute that command!");
  }
});

bot.login(process.env.DISCORD_BOT_TOKEN);
