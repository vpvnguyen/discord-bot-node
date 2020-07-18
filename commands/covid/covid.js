const novelCovidApi = require("novelcovid");

const baseUrl = "https://disease.sh";

novelCovidApi.settings({ baseUrl });

const layout = {
  theme: `#EC7063`,
  footer: `disease.sh`,
};

const covid = {
  name: "!covid",
  description: "covid desc",
  execute: async (msg, args) => {
    try {
      console.log("\n---execute---");
      console.log(`msg.content: ${msg.content}`);
      console.log(`args: ${args}\n`);

      // if there are no args
      if (args < 1) return msg.reply("Try `!covid help`");

      console.log(`\nargs[0]: ${args[0]}`);
      console.log(`args[1]: ${args[1]}`);
      console.log(`args[2]: ${args[2]}\n`);

      // using first args, find the name of the args in the available commands list
      // return the appropriate command to be ran
      let command;
      let commandName = args[0];
      let param = `${args[1]} ${args[2] ? args[2] : ""}`;
      Object.keys(apiMethod).map((key) => {
        if (commandName === apiMethod[key].name)
          return (command = apiMethod[key]);
      });

      console.log(`command:`, command);

      const embededMessage = await command.run(param);

      await msg.channel.send(embededMessage);
    } catch (error) {
      console.error(error.message);
    }
  },
};

// const embed = new Discord.MessageEmbed()
//   .setColor(covidLayout.theme)
//   .setTitle(covid.name)
//   .setDescription(covid.description)
//   // refactor
//   .addFields({ name: parsedMessage.name, value: parsedMessage.value })
//   .setFooter(covidLayout.footer);

const apiMethod = {
  help: {
    name: "help",
    run: async () => [
      "This is embarassing... try:",
      "!covid state [state_name]",
    ],
  },
  all: {
    name: "all",
    run: async () => "No one is safe in all dis... what else you need to know?",
  },
  country: {
    name: "country",
    run: async () => [
      "Haha... thats too much data for me to handle. Try: ",
      "!covid state [state_name]",
    ],
  },
  state: {
    name: "state",
    run: async (state) => {
      try {
        const response = await novelCovidApi.states({ state });
        console.log(`Retrieving API data for: ${state}`);
        console.log(response);
        if (response.message) return response.message;
        let parsed = [
          `${response.state}`,
          `Total Cases: ${response.cases}`,
          `Today's Cases: ${response.todayCases}`,
          `Today's Deaths: ${response.todayDeaths}`,
          `Total Deaths: ${response.deaths}`,
        ];
        return parsed;
      } catch (error) {
        console.error(error.message);
      }
    },
  },
};

module.exports = covid;
