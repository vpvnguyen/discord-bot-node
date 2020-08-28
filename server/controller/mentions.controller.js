const express = require("express");
const router = express.Router();

// get all mentions
router.get("/mentions", (req, res) => {
  console.log("get mentions");
  res.status(200).json({ message: "get mentions" });
});

// save mention
router.post("/mentions", (req, res) => {
  console.log("saving mentions");
  // TODO:
  // find if author exists in users; create user if does not exist
  // save mention
  res.status(200).json({ message: "saving mentions" });
});

module.exports = router;
