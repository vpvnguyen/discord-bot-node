const express = require("express");
const router = express.Router();

router.get("/message-history", (req, res) => {
  try {
    res.status(200).json({ message: "/api/message-history" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json("There was an issue retrieving the message history");
  }
});

module.exports = router;
