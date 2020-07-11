const novelCovidApi = require("../../utils/novelcovid.api");

const covidStates = {
  name: "!covidbystate",
  description: "Covid data by US states sorted by cases",
  execute(msg, args) {
    const response = novelCovidApi.states();

    console.log(response);
    //   msg.channel.send("I can't do that yet. My owner is working on it.");
  },
};

module.exports = covidStates;
