const novelCovidApi = require("../../utils/novelcovid.api");

const covidState = {
  name: "!covidca",
  description: "Covid data in California",
  execute: async (msg, args) => {
    try {
      const response = await novelCovidApi.state("California");
      console.log(response);
      await msg.channel.send([
        `${response.state}`,
        `Total Cases: ${response.cases}`,
        `Today's Cases: ${response.todayCases}`,
        `Today's Deaths: ${response.todayDeaths}`,
        `Total Deaths: ${response.deaths}`,
      ]);
    } catch (error) {
      console.error(error.message);
    }
  },
};

module.exports = covidState;
