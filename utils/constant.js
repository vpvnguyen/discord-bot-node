const constant = {
  messageContent: {
    prefix: "!",
    url: new RegExp(
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi
    ),
  },
  embedLayout: {
    theme: {
      default: "#6897bb",
      covid: "#EC7063",
      admin: "#c90579",
      history: "#551A8B",
    },
    author: "github.com/vpvnguyen",
    guild: {
      getIcon: (id, icon) =>
        `https://cdn.discordapp.com/icons/${id}/${icon}.png`,
    },
    inlineSpace: {
      name: "\u200B",
      value: "\u200B",
      inline: true,
    },
    newLine: {
      name: "\u200B",
      value: "\u200B",
      inline: false,
    },
  },
};

module.exports = constant;
