const novelCovidApi = require("../../utils/novelcovid.api");
const messageLayout = require("../../utils/layout/message.layout");

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
      const formattedMessage = messageLayout(parsedMessage);
      await msg.channel.send(formattedMessage);
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

  if (args < 1)
    return [
      "Try one of the following:",
      "!covid help",
      "!covid all",
      "!covid country [country_name]",
      "!covid state [state_name]",
    ];
  // find martching arg1 in apiMethod to execute appropriate run
  Object.keys(apiMethod).map((key) => {
    if (apiMethod[key].name === arg1) return (run = apiMethod[key]);
  });

  console.log(`run:`, run);

  const getDataFromApi = await run.run(arg2);
  //   run.run(msg);
  return getDataFromApi;
};

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
