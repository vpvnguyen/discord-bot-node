const commandUtil = {
  getListOfCommands: (commandObject) => {
    const commandList = Object.keys(commandObject).map((keys) => {
      return {
        name: commandObject[keys].name,
        key: commandObject[keys],
        description: commandObject[keys].description
          ? commandObject[keys].description
          : "",
        args: commandObject[keys].args ? commandObject[keys].args : "",
      };
    });

    return commandList.sort();
  },
  findCommand: (commandName, commandObject) => {
    let targetKey = Object.keys(commandObject).filter((key) => {
      if (commandName === commandObject[key].name) {
        return commandObject[key];
      }
    });

    return commandObject[targetKey];
  },
};
module.exports = commandUtil;
