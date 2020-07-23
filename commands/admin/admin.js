const admin = {
  name: "!admin",
  description: "Administrative commands",
  execute(msg, args) {
    // check users role
    console.log(msg);
    console.log(msg.member);
    msg.reply("admin commands");
  },
};

module.exports = admin;
