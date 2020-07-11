const novelCovidApi = require("../../utils/novelcovid.api");

const covidCountry = {
  name: "!covidcountry",
  description: "Covid data by country",
  execute(msg, args) {
    msg.channel.send("I can't do that yet. My owner is working on it.");
  },
};

module.exports = covidCountry;
