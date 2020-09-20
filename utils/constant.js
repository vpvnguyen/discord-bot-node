const discordCdnUrl = `https://cdn.discordapp.com`;

const constant = {
  messageContent: {
    prefix: "!",
    url: new RegExp(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    ),
    mention: new RegExp(/<@[\S]+>/g),
  },
  roles: ["admin", "mod", "user"],
  embedLayout: {
    theme: {
      default: "#6897bb",
      covid: "#EC7063",
      admin: "#c90579",
      history: "#551A8B",
    },
    author: "github.com/vpvnguyen",
    user: {
      getIcon: (id, icon) => {
        let fileExtension = "png";
        if (icon.startsWith("a_")) fileExtension = "gif";
        return `${discordCdnUrl}/avatars/${id}/${icon}.${fileExtension}`;
      },
    },
    guild: {
      getIcon: (id, icon) => `${discordCdnUrl}/icons/${id}/${icon}.png`,
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
