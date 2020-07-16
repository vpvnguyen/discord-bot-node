//   // validate message
//   const prefix = "!";
//   if (!msg.content.startsWith(prefix)) return;
//   console.log("---msg.name---");
//   console.log(msg.author.username);
//   if (msg.author.username === "sugoi-bot") return;

//   const args = msg.content.split(/ +/);
//   const command = args.shift().toLowerCase();

//   console.log(`msg.content: ${msg.content}`);
//   console.log(`args: ${args}`);
//   console.info(`Called command: ${command}`);

// ****** give this a new func *********
//   if (command === "!kill") {
//     exit(msg);
//   }

//   if (!bot.commands.has(command))
//     return msg.reply("Huh? You rang? No comprende...");

//   try {
//     console.log("BOT COMMANDS GET COMMAND");
//     console.log(bot.commands.get(command));
//     bot.commands.get(command).execute(msg, args);
//   } catch (error) {
//     console.error(error);
//     msg.reply("there was an error trying to execute that command!");
//   }

const msg = {
  content: "!yo1 yo2 yo3",
  author: {
    username: "sugoi-bott",
  },
};

const map = (msg) => {
  if (isNotValidCommand(msg)) return console.log("is not valid");
  console.log("valid, continue");

  console.log("defineInput");
  const { args, command } = defineInput(msg);

  console.log("findCommands");
  const runCommand = findCommands(args, command);

  console.log("runCommand");
  console.log(runCommand);
};

const isNotValidCommand = (msg) => {
  const prefix = "!";
  if (!msg.content.startsWith(prefix) || msg.author.username === "sugoi-bot")
    return true;
};

const defineInput = (msg) => {
  const args = msg.content.split(/ +/);
  const command = args.shift().toLowerCase();

  console.log(`msg.content: ${msg.content}`);
  console.log(`args: ${args}`);
  console.info(`Called command: ${command}`);

  return {
    args,
    command,
  };
};

const findCommands = (args, command) => {
  console.log(command);
  console.log(args);
  return;
};

map(msg);
