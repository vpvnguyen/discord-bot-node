const getListOfCommands = (commandObject) => {
  const commandKeys = Object.keys(commandObject);
  const commandList = commandKeys.map((keys) => {
    return {
      name: commandObject[keys].name,
      key: commandObject[keys],
      description: commandObject[keys].description
        ? commandObject[keys].description
        : "",
      args: commandObject[keys].args ? commandObject[keys].args : "",
    };
  });

  const sortCommandList = commandList.sort();
  return sortCommandList;
};

module.exports = getListOfCommands;
