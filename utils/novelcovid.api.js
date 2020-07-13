const novelCovidApi = require("novelcovid");

const baseUrl = "https://disease.sh";

novelCovidApi.settings({ baseUrl });

const novelCovidApiMethods = {
  all: async () => {
    try {
      const response = await novelCovidApi.all();
      console.log(response);
      return response;
    } catch (error) {
      console.error(error.message);
    }
  },
  allCountries: async () => {
    try {
      const response = await novelCovidApi.countries();
      console.log(JSON.stringify(response));
      return response;
    } catch (error) {
      console.error(error.message);
    }
  },
  country: async (country) => {
    try {
      const response = await novelCovidApi.countries({ country });
      console.log(response);
      return response;
    } catch (error) {
      console.error(error.message);
    }
  },
  states: async () => {
    try {
      const response = await novelCovidApi.states({ sort: "cases" });
      console.log(response);
      return response;
    } catch (error) {
      console.error(error.message);
    }
  },
  state: async (state) => {
    try {
      const response = await novelCovidApi.states({ state });
      console.log(response);
      return response;
    } catch (error) {
      console.error(error.message);
    }
  },
};

module.exports = novelCovidApiMethods;