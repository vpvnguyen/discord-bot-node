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

router.get("/profanity-messages", async (req, res) => {
  try {
    const messages = await pool.query(
      "SELECT * FROM messages WHERE profanity_count > 0"
    );
    res.status(200).json(messages.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Issue retrieving profanity messages" });
  }
});

router.get("/user/:id/profanity", async (req, res) => {
  try {
    const { id } = req.params;
    const messages = await pool.query(
      "SELECT * FROM messages WHERE user_id = $1 AND profanity_count > 0",
      [id]
    );
    res.status(200).json(messages.rows);
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ message: "Issue retrieving profanity message from a user's ID" });
  }
});

router.post("/message", async (req, res) => {
  try {
    const {
      userId,
      username,
      discriminator,
      messageId,
      message,
      channelId,
      channel,
      hasLink,
      profanityCount,
      date,
    } = req.body;

    // check if user exists, get userId
    const user = await pool.query(
      "SELECT user_id FROM users WHERE username = $1 AND discriminator = $2",
      [username, discriminator]
    );

    // if user does not exist, add user to users table
    if (user.rows.length === 0) {
      const createUser = await pool.query(
        "INSERT INTO users (user_id, username, discriminator, role) VALUES ($1, $2, $3, $4) RETURNING user_id",
        [userId, username, discriminator, "user"]
      );
    }

    // save message into messages table
    const addMessage = await pool.query(
      "INSERT INTO messages (message_id, message, channel_id, channel, has_link, profanity_count, date, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        messageId,
        message,
        channelId,
        channel,
        hasLink,
        profanityCount,
        new Date(date).toISOString(),
        userId,
      ]
    );

    res.status(200).json(addMessage.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Issue saving link" });
  }
});

router.get("/links", async (req, res) => {
  try {
    const messages = await pool.query(
      "SELECT users.username, users.discriminator, messages.message, messages.channel, messages.date FROM users INNER JOIN messages ON users.user_id = messages.user_id WHERE messages.has_link = true"
    );
    res.status(200).json(messages.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Issue retrieving links" });
  }
});

router.get("/links/:channelId", async (req, res) => {
  try {
    const { channelId } = req.params;
    const messages = await pool.query(
      "SELECT users.username, users.discriminator, messages.message, messages.channel, messages.date FROM users INNER JOIN messages ON users.user_id = messages.user_id WHERE messages.has_link = true AND messages.channel_id = $1",
      [channelId]
    );
    res.status(200).json(messages.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Issue retrieving links" });
  }
});

module.exports = router;
