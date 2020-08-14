const express = require("express");
const router = express.Router();
const pool = require("../config/db.config");
const { recentMessageByDate } = require("../utils/sort.utils");

// get all messages
router.get("/messages", async (req, res) => {
  try {
    const messages = await pool.query("SELECT * FROM messages");
    res.status(200).json(messages.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Issue retrieving all messages" });
  }
});

// get messages by user id
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

// get all messages containing profanity
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

// get messages from user id containing profanity
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

// record message
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

// get all messages with links
router.get("/links", async (req, res) => {
  try {
    const messages = await pool.query(
      "SELECT users.username, users.discriminator, messages.message, messages.channel, messages.date FROM users INNER JOIN messages ON users.user_id = messages.user_id WHERE messages.has_link = true"
    );
    const sortMessageDate = recentMessageByDate(messages.rows);
    res.status(200).json(sortMessageDate);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Issue retrieving links" });
  }
});

// get all messages with links by channel name
router.get("/links/channel/:channel", async (req, res) => {
  try {
    const { channel } = req.params;
    const messages = await pool.query(
      "SELECT users.username, users.discriminator, messages.message, messages.channel, messages.date FROM users INNER JOIN messages ON users.user_id = messages.user_id WHERE messages.has_link = true AND messages.channel = $1",
      [channel]
    );
    const sortMessageDate = recentMessageByDate(messages.rows);
    res.status(200).json(sortMessageDate);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Issue retrieving links" });
  }
});

// get all messages by channel id
router.get("/links/channel/id/:channelId", async (req, res) => {
  try {
    const { channelId } = req.params;
    const messages = await pool.query(
      "SELECT users.username, users.discriminator, messages.message, messages.channel, messages.date FROM users INNER JOIN messages ON users.user_id = messages.user_id WHERE messages.has_link = true AND messages.channel_id = $1",
      [channelId]
    );
    const sortMessageDate = recentMessageByDate(messages.rows);
    res.status(200).json(sortMessageDate);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Issue retrieving links" });
  }
});

// get links from username
router.get("/links/username/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const messages = await pool.query(
      "SELECT users.username, users.discriminator, messages.message, messages.channel, messages.date FROM users INNER JOIN messages ON users.user_id = messages.user_id WHERE users.username = $1",
      [username]
    );
    const sortMessageDate = recentMessageByDate(messages.rows);
    res.status(200).json(sortMessageDate);
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ message: `Issue retrieving links from ${username}` });
  }
});

module.exports = router;
