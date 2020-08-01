const links = {
  saveLinks: async (msg) => {
    console.log("saveLinks");
    if (msg.content.includes("http" || "www" || ".com") && !msg.author.bot) {
      // call api
    }
  },
};

module.exports = links;
