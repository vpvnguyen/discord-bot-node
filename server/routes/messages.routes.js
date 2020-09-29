const express = require("express");
const router = express.Router();
const MessagesController = require("../controller/messages.controller");

router.get("/messages", async (req, res) =>
  MessagesController.getAllMessages(req, res)
);

router.get("/user/:id/messages", async (req, res) =>
  MessagesController.getMessagesByUserId(req, res)
);

router.get("/profanity-messages", async (req, res) =>
  MessagesController.getAllMessagesWithProfanity(req, res)
);

router.get("/user/:id/profanity", async (req, res) =>
  MessagesController.getUserMessagesWithProfanityByUserId(req, res)
);

router.post("/message", async (req, res) =>
  MessagesController.recordMessage(req, res)
);

router.get("/links", async (req, res) =>
  MessagesController.getAllMessagesWithLinks(req, res)
);

router.get("/links/channel/:channel", async (req, res) =>
  MessagesController.getAllMessagesWithLinksByChannelName(req, res)
);

router.get("/links/channel/id/:channelId", async (req, res) =>
  MessagesController.getAllMessagesByChannelId(req, res)
);

router.get("/links/username/:username", async (req, res) =>
  MessagesController.getMessagesWithLinksByUsername(req, res)
);

module.exports = router;
