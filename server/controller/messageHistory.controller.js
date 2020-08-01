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

router.post("/save-link", async (req, res) => {
  try {
    const { username, discriminator, message, channel } = req.body;
    let userId;
    const amountCurse = 0; // refactor to take in curse detection

    // check if user exists, get user_id
    const users = await pool.query(
      "SELECT user_id FROM users WHERE username = $1 AND discriminator = $2",
      [username, discriminator]
    );

    // if user does not exist, add user to users table
    if (users.rows.length > 0) userId = users.rows[0].user_id;
    if (users.rows.length === 0) {
      const saveUser = await pool.query(
        "INSERT INTO users (username, discriminator, role) VALUES ($1, $2, $3) RETURNING user_id",
        [username, discriminator, "user"]
      );
      userId = saveUser.rows[0].user_id;
    }

    // take user_id and add to messages
    const saveMessage = await pool.query(
      "INSERT INTO messages (message, channel, has_link, amount_curse, date, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [message, channel, true, amountCurse, new Date(), userId]
    );

    res.status(200).json(saveMessage);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Issue saving link" });
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
