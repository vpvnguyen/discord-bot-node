const constants = {
  theme: {
    default: "",
    covid: "#EC7063",
  },
  author: "github.com/vpvnguyen",
  inlineSpace: {
    name: "\u200B",
    value: "\u200B",
    inline: false,
  },
  newLine: {
    name: "\u200B",
    value: "\u200B",
    inline: true,
  }
};

author: "github.com/vpvnguyen",
theme: `#EC7063`,
footer: () => `${baseUrl.split("//")[1]} • ${layout.author}`,
newLine: {
  name: "\u200B",
  value: "\u200B",
  inline: true,
},

module.exports = constants;
