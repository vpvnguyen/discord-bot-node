require("dotenv").config();
const { MessageEmbed } = require("discord.js");
const { checkPermission } = require("../../utils/permission");
const { getLinks, getLinksByChannel } = require("../../utils/api/messages.api");
const getListOfCommands = require("../../utils/getListOfCommands");

const adminCommands = {
  kill: {
    name: "kill",
    args: "kill",
    description: "Kill bot process",
    run: async (msg) => {
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
    },
  },
  allLinks: {
    name: "links",
    args: "links",
    description: "Get history of all links",
    run: async () => {
      try {
        const links = await getLinks();
        console.log.name(links);
        const embededMessage = new MessageEmbed().setDescription({
          name: "",
          value: "",
        });

        return embededMessage;
      } catch (error) {
        return await msg.reply("Issue getting links");
      }
    },
  },
};

const saveLinks = (msg) => {
  if (msg.content.includes("http" || "www" || ".com") && !msg.author.bot) {
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

const admin = {
  name: "!admin",
  description: "Administrative commands",
  execute: async (msg, args) => {
    try {
      if (msg.author.bot) return;
      const { username, discriminator } = msg.author;
      const user = await checkPermission(username, discriminator);

      if (user.role !== "admin") return await msg.reply("Access denied.");

      await msg.reply("Admin commands granted");
      const listOfCommands = getListOfCommands(adminCommands);
      console.log(listOfCommands);
    } catch (error) {
      console.error(error.message);
      await msg.reply("There was an issue connecting to the API server.");
    }
  },
};

module.exports = admin;
