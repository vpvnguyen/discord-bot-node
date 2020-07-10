// configure commands to be used
const commands = require("../commands/");

console.log(`
    commands
`);
console.log(commands);

console.log(`
    Object.keys
`);
console.log(Object.keys(commands));

console.log(`
    Object.keys.map
`);
Object.keys(commands).map((keys) => {
  console.log(`keys: ${keys}`);
  console.log(`commands[keys]: ${JSON.stringify(commands[keys])}`);
  console.log(`commands[keys]: ${JSON.stringify(commands[keys].name)}`);
});
