const getListOfCommands = (parentObject) => {
  const commandKeys = Object.keys(parentObject);
  const commandList = commandKeys.map((keys) => {
    return {
      name: parentObject[keys].name,
      key: parentObject[keys],
      description: parentObject[keys].description
        ? parentObject[keys].description
        : "",
      args: parentObject[keys].args ? parentObject[keys].args : "",
    };
  });

  const sortCommandList = commandList.sort();
  return sortCommandList;
};

module.exports = getListOfCommands;
