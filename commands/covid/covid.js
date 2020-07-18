const { MessageEmbed } = require("discord.js");
const dayjs = require("dayjs");
const novelCovidApi = require("novelcovid");
const getListOfCommands = require("../../utils/getListOfCommands");

const baseUrl = "https://disease.sh";

novelCovidApi.settings({ baseUrl });

const layout = {
  author: "github.com/vpvnguyen",
  theme: `#EC7063`,
  footer: () => `${baseUrl.split("//")[1]} • ${layout.author}`,
  newLine: {
    name: "\u200B",
    value: "\u200B",
    inline: true,
  },
};

const apiCommand = {
  help: {
    name: "help",
    args: "help",
    description: "List of !covid commands",
    run: () => {
      const listOfCommands = getListOfCommands(apiCommand);

      console.log(listOfCommands);

      const embededMessage = new MessageEmbed()
        .setColor(layout.theme)
        .setDescription(`Here is what I can do:`)
        .addFields(
          {
            name: "\u200B",
            value: listOfCommands.map((command) => `!covid ${command.args}`),
          },
          {
            name: "\u200B",
            value: "Example: `!covid state california`",
          }
        )
        .setFooter(layout.author);

      return embededMessage;
    },
  },
  all: {
    name: "all",
    args: "all",
    description: "All Covid data",
    run: async () => "No one is safe in all dis... what else you need to know?",
  },
  country: {
    name: "country",
    args: "country [country_name]",
    description: "Covid data by country",
    run: async () => [
      "Haha... thats too much data for me to handle. Try: ",
      "`!covid state [state_name]`",
      "Example: `!covid state california`",
    ],
  },
  state: {
    name: "state",
    args: "state [state_name]",
    description: "Covid data by state",
    run: async (state) => {
      try {
        const response = await novelCovidApi.states({ state });
        console.log(`\nRetrieving API data for: ${state}`);
        console.log(response);

        if (response.message) return response.message;

        const embededMessage = new MessageEmbed()
          .setColor(layout.theme)
          .setDescription(`Here are the results for ${response.state}:`)
          .addFields(
            {
              name: "Cases",
              value: `Today: ${response.todayCases}\nTotal: ${response.cases}`,
              inline: true,
            },
            {
              name: "Deaths",
              value: `Today: ${response.todayDeaths}\nTotal: ${response.deaths}`,
              inline: true,
            },
            layout.newLine,
            {
              name: "Analytics",
              value: `Active: ${response.active}\nTested: ${response.tests}`,
            }
          )
          .setFooter(
            `Last updated ${dayjs(response.updated).format(
              "MM-DD-YYYY"
            )} from ${layout.footer()}`
          );

        return embededMessage;
      } catch (error) {
        console.error(error.message);
      }
    },
  },
};

const covid = {
  name: "!covid",
  description: "Covid data by command",
  execute: async (msg, args) => {
    try {
      console.log("\n---execute---");
      console.log(`msg.content: ${msg.content}\n`);

      // if there are no args
      if (args < 1) return msg.reply("Try `!covid help`");

      // define args
      let command;
      const commandName = args[0];
      const param = `${args[1]} ${args[2] ? args[2] : ""}`;

      // find api command from command name
      Object.keys(apiCommand).map((key) => {
        if (commandName === apiCommand[key].name)
          return (command = apiCommand[key]);
      });

      const embededMessage = await command.run(param);
      await msg.channel.send(embededMessage);
    } catch (error) {
      console.error(error.message);
    }
  },
};

module.exports = covid;
