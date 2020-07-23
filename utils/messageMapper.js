require("dotenv").config();
const { Client, Collection, MessageEmbed } = require("discord.js");
const botCommands = require("./commands");
// const saveLinks = (msg) => {
//   console.log(msg.channel.guild.name);
//   const guildName = msg.channel.guild.name;
//   if (
//     msg.content.includes("http" || "https") &&
//     msg.author.username !== process.env.DISCORD_BOT_NAME
//   ) {
//     function Message(guildName, author, content, date) {
//       this.guild = guildName;
//       this.author = author;
//       this.content = content;
//       this.date = new Date();
//     }

//     const newObj = new Message(guildName, msg.author.username, msg.content);
//     links.guildName = newObj;
//     console.log(newObj);
//     console.log(links.guildName);
//     console.log(links);
//   }
// };

const messageMapper = () => {
  console.log("messageMapper");
};

const saveLinks = (msg) => {
  if (
    msg.content.includes("http") &&
    !msg.author.bot &&
    msg.author.username !== process.env.DISCORD_BOT_NAME
  ) {
    links.push({
      author: msg.author.username,
      content: msg.content,
      date: new Date(),
    });
  }
};

const accessLinks = async (msg) => {
  console.log(links);
  if (links.length === 0) return msg.reply("There are no links");
  const embededMessage = new MessageEmbed()
    .setColor("#32a8a8")
    .setDescription(
      `There are [${links.length}] link(s) recorded since ${dayjs(
        links[0].date
      ).format("MM-DD-YYYY hh:mma")}:`
    )
    .addFields(
      links.map((value) => {
        return {
          name: `${value.author} | ${dayjs(value.date).format(
            "MM-DD-YYYY hh:mma"
          )}`,
          value: `${value.content}`,
        };
      })
    )
    .setFooter("github.com/vpvnguyen");

  await msg.channel.send(embededMessage);
};

const doesNotContainCommand = (msg) => {
  const prefix = "!";
  if (
    !msg.content.startsWith(prefix) ||
    msg.author.bot ||
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
  if (!bot.commands.has(command)) return true;
  return false;
};

const exit = (msg) => {
  if (msg.author.bot || msg.author.username !== process.env.ADMIN)
    return msg.reply("I don't think so");

  let countDown = 5;

  msg.channel.send(`Shutting down in ${countDown}...`);

  setInterval(async () => {
    countDown--;
    if (countDown === 0) {
      await msg.channel.send("Goodbye.");
      return process.exit(22);
    }
    return msg.channel.send(`${countDown}...`);
  }, 1000);
};

module.exports = messageMapper;
