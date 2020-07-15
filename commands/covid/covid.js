const Discord = require("discord.js");
const novelCovidApi = require("../../utils/api/novelcovid.api");
const covidLayout = require("../../utils/layout/layout");

const covid = {
  name: "!covid",
  description: "covid desc",
  execute: async (msg, args) => {
    try {
      console.log("---execute---");
      console.log(`msg.content: ${msg.content}`);
      console.log(`args: ${args}`);

      const parsedMessage = await mapper(msg, args);
      console.log(`---parsedMessage---`);
      console.log(parsedMessage);

      const embed = new Discord.MessageEmbed()
        .setColor(covidLayout.theme)
        .setTitle(covid.name)
        .setDescription(covid.description)
        // refactor
        .addFields({ name: parsedMessage.name, value: parsedMessage.value })
        .setFooter(covidLayout.footer);

      await msg.channel.send(embed);
    } catch (error) {
      console.error(error.message);
    }
  },
};

const mapper = async (msg, args) => {
  console.log("---mapper---");
  console.log(args);
  let run;
  const arg1 = args[0];
  const arg2 = args[1];

  console.log(`arg1: ${arg1}`);
  console.log(`arg2: ${arg2}`);

  // if there are no args
  if (args < 1)
    return {
      name: "Try one of the following:",
      value: [
        "!covid help",
        "!covid all",
        "!covid country [country_name]",
        "!covid state [state_name]",
      ],
    };

  // find matching arg1 in apiMethod to execute appropriate run
  Object.keys(apiMethod).map((key) => {
    if (apiMethod[key].name === arg1) return (run = apiMethod[key]);
  });

  console.log(`run:`, run);

  const getDataFromApi = await run.run(arg2);
  return {
    name: "Api Data", // refactor to either set embeded message fields here or later
    value: getDataFromApi,
  };
};

// refactor to either set embeded message fields from method or earlier
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
        const data = await novelCovidApi.state(state);
        return data;
      } catch (error) {
        console.error(error.message);
      }
    },
  },
};

module.exports = covid;
