const express = require("express");
const router = express.Router();
const pool = require("../config/db.config");

router.get("/messages", async (req, res) => {
  try {
    const messages = await pool.query("SELECT * FROM messages");
    console.log(messages.rows);
    res.status(200).json(messages.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Issue retrieving all messages" });
  }
});

router.get("/user/:id/messages", async (req, res) => {
  try {
    const { id } = req.params;
    const messages = await pool.query(
      "SELECT * FROM messages WHERE user_id = $1",
      [id]
    );
    res.status(200).json(messages.rows);
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ message: "Issue retrieving messages from a user's ID" });
  }
});

router.get("/curses", async (req, res) => {
  try {
    const messages = await pool.query(
      "SELECT * FROM messages WHERE amount_curse > 0"
    );
    console.log(messages.rows);
    res.status(200).json(messages.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Issue retrieving curses" });
  }
});

router.get("/user/:id/curses", async (req, res) => {
  try {
    const { id } = req.params;
    const messages = await pool.query(
      "SELECT * FROM messages WHERE user_id = $1 AND amount_curse > 0",
      [id]
    );
    console.log(messages.rows);
    res.status(200).json(messages.rows);
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ message: "Issue retrieving curses from a user's ID" });
  }
});

router.get("/links", async (req, res) => {
  try {
    const messages = await pool.query(
      "SELECT * FROM messages WHERE has_link = true"
    );
    console.log(messages.rows);
    res.status(200).json(messages.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Issue retrieving links" });
  }
});

module.exports = router;
