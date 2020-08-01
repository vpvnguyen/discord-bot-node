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
    },
    author: "github.com/vpvnguyen",
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
