const { MessageEmbed } = require("discord.js");
const dayjs = require("dayjs");
const { embedLayout } = require("../../utils/constant");
const getListOfCommands = require("../../utils/getListOfCommands");
const formatNumber = require("../../utils/formatNumber");

const novelCovidApi = require("novelcovid");

const baseUrl = "https://disease.sh";

novelCovidApi.settings({ baseUrl });

const apiCommand = {
  help: {
    name: "help",
    args: "help",
    description: "List of `!covid` commands",
    run: () => {
      const listOfCommands = getListOfCommands(apiCommand);

      const embededMessage = new MessageEmbed()
        .setColor(embedLayout.theme.covid)
        .setDescription(`Here is what I can do:`)
        .addFields(
          {
            name: "\u200B",
            value: listOfCommands.map(
              (command) =>
                `\`!covid ${command.args}\`\n • ${command.description}\n`
            ),
          },
          {
            name: "\u200B",
            value: "Example: `!covid state california`",
          }
        )
        .setFooter(
          `Data sourced from Johns Hopkins University, the New York Times, Worldometers, and Apple reports to give you a comprehensive view of the data.\n\n${embedLayout.author}`
        );

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

        if (response.message) return response.message;

        const embededMessage = new MessageEmbed()
          .setColor(embedLayout.theme.covid)
          .setDescription(`Here are the results Worldwide:`)
          .addFields(
            {
              name: "Cases",
              value: `Today: ${formatNumber(
                response.todayCases
              )}\nTotal: ${formatNumber(response.cases)}`,
              inline: true,
            },
            {
              name: "Deaths",
              value: `Today: ${formatNumber(
                response.todayDeaths
              )}\nTotal: ${formatNumber(response.deaths)}`,
              inline: true,
            },
            {
              name: "Recovered",
              value: `Today: ${formatNumber(
                response.todayRecovered
              )}\nTotal: ${formatNumber(response.recovered)}`,
              inline: true,
            },
            {
              name: "Analytics",
              value: `Active: ${formatNumber(
                response.active
              )}\nTested: ${formatNumber(
                response.tests
              )}\nCritical: ${formatNumber(
                response.critical
              )}\nPopulation: ${formatNumber(
                response.population
              )}\nAffected Countries: ${formatNumber(
                response.affectedCountries
              )}`,
              inline: true,
            }
          )
          .setFooter(
            `Last updated ${dayjs(response.updated).format(
              "MM-DD-YYYY h:mma"
            )} GMT from ${baseUrl.split("//")[1]} • ${embedLayout.author}`
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

        if (response.message)
          return `${response.message}... Try for example \`!covid country usa\``;

        const embededMessage = new MessageEmbed()
          .setColor(embedLayout.theme.covid)
          .setDescription(`Here are the results for ${response.country}:`)
          .setThumbnail(response.countryInfo.flag)
          .addFields(
            {
              name: "Cases",
              value: `Today: ${formatNumber(
                response.todayCases
              )}\nTotal: ${formatNumber(response.cases)}`,
              inline: true,
            },
            {
              name: "Deaths",
              value: `Today: ${formatNumber(
                response.todayDeaths
              )}\nTotal: ${formatNumber(response.deaths)}`,
              inline: true,
            },
            {
              name: "Recovered",
              value: `Today: ${formatNumber(
                response.todayRecovered
              )}\nTotal: ${formatNumber(response.recovered)}`,
              inline: true,
            },
            {
              name: "Analytics",
              value: `Active: ${formatNumber(
                response.active
              )}\nTested: ${formatNumber(
                response.tests
              )}\nCritical: ${formatNumber(
                response.critical
              )}\nPopulation: ${formatNumber(response.population)}`,
              inline: true,
            }
          )
          .setFooter(
            `Last updated ${dayjs(response.updated).format(
              "MM-DD-YYYY h:mma"
            )} GMT from ${baseUrl.split("//")[1]} • ${embedLayout.author}`
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

        if (response.message)
          return `${response.message}... Try for example \`!covid state california\``;

        const embededMessage = new MessageEmbed()
          .setColor(embedLayout.theme.covid)
          .setDescription(`Here are the results for ${response.state}:`)
          .addFields(
            {
              name: "Cases",
              value: `Today: ${formatNumber(
                response.todayCases
              )}\nTotal: ${formatNumber(response.cases)}`,
              inline: true,
            },
            {
              name: "Deaths",
              value: `Today: ${formatNumber(
                response.todayDeaths
              )}\nTotal: ${formatNumber(response.deaths)}`,
              inline: true,
            },
            embedLayout.inlineSpace,
            {
              name: "Analytics",
              value: `Active: ${formatNumber(
                response.active
              )}\nTested: ${formatNumber(response.tests)}`,
            }
          )
          .setFooter(
            `Last updated ${dayjs(response.updated).format(
              "MM-DD-YYYY h:mma"
            )} GMT from ${baseUrl.split("//")[1]} • ${embedLayout.author}`
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

        if (response.message)
          return `${response.message}... Try for example \`!covid county orange\``;

        const embededMessage = new MessageEmbed()
          .setColor(embedLayout.theme.covid)
          .setDescription(`Here are the totals for \`${county}\`:`)
          .addFields(
            response.map((data) => {
              if (data.country === "US")
                return {
                  name: `${data.province} | ${data.county}`,
                  value: `Total Cases: ${formatNumber(
                    data.stats.confirmed
                  )}\nDeaths: ${formatNumber(data.stats.deaths)}\n${
                    data.stats.recovered === 0
                      ? ""
                      : `Recovered: ${formatNumber(data.stats.recovered)}`
                  }`,
                };
            })
          )
          .setFooter(
            `Updated: ${dayjs(response[0].updatedAt).format(
              "MM-DD-YYYY h:mma"
            )} GMT • ${baseUrl.split("//")[1]} • ${embedLayout.author}`
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
      // if there are no args
      if (args < 1) return msg.channel.send(apiCommand.help.run());

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
