const { MessageEmbed } = require("discord.js");
const dayjs = require("dayjs");
const novelCovidApi = require("novelcovid");
const getListOfCommands = require("../../utils/getListOfCommands");
const constant = require("../../utils/constant");

const baseUrl = "https://disease.sh";

novelCovidApi.settings({ baseUrl });

const apiCommand = {
  help: {
    name: "help",
    args: "help",
    description: "List of !covid commands",
    run: () => {
      const listOfCommands = getListOfCommands(apiCommand);

      console.log(listOfCommands);

      const embededMessage = new MessageEmbed()
        .setColor(constant.theme.covid)
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
        .setFooter(constant.author);

      return embededMessage;
    },
  },
  all: {
    name: "all",
    args: "all",
    description: "All Covid data",
    run: async () => {
      try {
        const response = await novelCovidApi.all();
        console.log(response);

        if (response.message) return response.message;

        const embededMessage = new MessageEmbed()
          .setColor(constant.theme.covid)
          .setDescription(`Here are the results Worldwide:`)
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
            {
              name: "Recovered",
              value: `Today: ${response.todayRecovered}\nTotal: ${response.recovered}`,
              inline: true,
            },
            {
              name: "Analytics",
              value: `Active: ${response.active}\nTested: ${response.tests}\nCritical: ${response.critical}\nPopulation: ${response.population}\nAffected Countries: ${response.affectedCountries}`,
              inline: true,
            }
          )
          .setFooter(
            `Last updated ${dayjs(response.updated).format(
              "MM-DD-YYYY"
            )} from ${baseUrl.split("//")[1]} • ${constant.author}`
          );

        return embededMessage;
      } catch (error) {
        console.error(error.message);
      }
    },
  },
  country: {
    name: "country",
    args: "country [country_name]",
    description: "Covid data by country",
    run: async (country) => {
      try {
        const response = await novelCovidApi.countries({ country });
        console.log(response);

        if (response.message) return response.message;

        const embededMessage = new MessageEmbed()
          .setColor(constant.theme.covid)
          .setDescription(`Here are the results for ${response.country}:`)
          .setThumbnail(response.countryInfo.flag)
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
            {
              name: "Recovered",
              value: `Today: ${response.todayRecovered}\nTotal: ${response.recovered}`,
              inline: true,
            },
            {
              name: "Analytics",
              value: `Active: ${response.active}\nTested: ${response.tests}\nCritical: ${response.critical}\nPopulation: ${response.population}`,
              inline: true,
            }
          )
          .setFooter(
            `Last updated ${dayjs(response.updated).format(
              "MM-DD-YYYY"
            )} from ${baseUrl.split("//")[1]} • ${constant.author}`
          );

        return embededMessage;
      } catch (error) {
        console.error(error.message);
      }
    },
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
          .setColor(constant.theme.covid)
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
            constant.inlineSpace,
            {
              name: "Analytics",
              value: `Active: ${response.active}\nTested: ${response.tests}`,
            }
          )
          .setFooter(
            `Last updated ${dayjs(response.updated).format(
              "MM-DD-YYYY"
            )} from ${baseUrl.split("//")[1]} • ${constant.author}`
          );

        return embededMessage;
      } catch (error) {
        console.error(error.message);
      }
    },
  },
  county: {
    name: "county",
    args: "county [county_name]",
    description: "Covid data by county",
    run: async (county) => {
      try {
        const response = await novelCovidApi.jhucsse.counties({ county });
        console.log(`\nRetrieving API data for: ${county}`);
        console.log(response);

        if (response.message) return response.message;

        response.map((keys) => {
          console.log(`province: ${keys.province}`);
          console.log(`county: ${keys.county}`);
        });
        const embededMessage = new MessageEmbed()
          .setColor(constant.theme.covid)
          .setDescription(`Here are the totals for \`${county}\`:`)
          .addFields(
            response.map((data) => {
              if (data.country === "US")
                return {
                  name: `${data.province} | ${data.county}`,
                  value: `Total Cases: ${data.stats.confirmed}\nDeaths: ${
                    data.stats.deaths
                  }\n${
                    data.stats.recovered === 0
                      ? ""
                      : `Recovered: ${data.stats.recovered}`
                  }`,
                };
            })
          )
          .setFooter(
            `Updated: ${dayjs(response[0].updatedAt).format("MM-DD-YYYY")} • ${
              baseUrl.split("//")[1]
            } • ${constant.author}`
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
