const novelCovidApi = require("../../utils/novelcovid.api");

const covidState = {
  name: "!covidca",
  description: "Covid data in California",
  execute(msg, args) {
    const getData = async () => {
      const response = await novelCovidApi.state("California");
      console.log(response);
      await msg.channel.send(response);
    };
    getData();
  },
};

module.exports = covidState;
