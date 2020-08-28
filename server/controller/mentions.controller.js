const express = require("express");
const router = express.Router();

router.get("/mentions", (req, res) => {
  console.log("get mentions");
  res.status(200).json({ message: "get mentions" });
});

router.post("/mentions", (req, res) => {
  console.log("saving mentions");
  res.status(200).json({ message: "saving mentions" });
});

module.exports = router;
