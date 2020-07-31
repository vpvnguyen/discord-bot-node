// redirect to function to decide whats to be saved
const record = {
  links: require("./links"),
};

const records = (msg) => {
  // direct different messages to be recorded
  console.log("records");
  console.log(msg);
};

module.exports = records;
