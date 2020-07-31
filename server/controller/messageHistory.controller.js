const express = require("express");
const router = express.Router();
const pool = require("../config/db.config");

router.get("/messages", async (req, res) => {
  try {
    const messages = await pool.query("SELECT * FROM messages");
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
      "SELECT users.username, users.discriminator, messages.message, messages.channel, messages.date FROM users INNER JOIN messages ON users.user_id = messages.user_id WHERE users.user_id = 1 AND messages.has_link = true;"
    );
    res.status(200).json(messages.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Issue retrieving links" });
  }
});

router.get("/links/:channel", async (req, res) => {
  try {
    const { channel } = req.params;
    const messages = await pool.query(
      "SELECT * FROM messages WHERE has_link = true AND channel = $1",
      [channel]
    );
    res.status(200).json(messages.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: `Issue retrieving links from ${channel}` });
  }
});

module.exports = router;
