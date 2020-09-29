const pool = require("../config/db.config");
const { recentMessageByDate } = require("../utils/sort.utils");
const messageUtil = require("../utils/messages.utils");

class MessagesController {
  static getAllMessages = async (req, res) => {
    try {
      const messages = await pool.query("SELECT * FROM messages");
      return res.status(200).json(messages.rows);
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ message: "Issue retrieving all messages" });
    }
  };

  static getMessagesByUserId = async (req, res) => {
    try {
      const { id } = req.params;
      const messages = await pool.query(
        "SELECT * FROM messages WHERE user_id = $1",
        [id]
      );
      return res.status(200).json(messages.rows);
    } catch (error) {
      console.error(error.message);
      return res
        .status(500)
        .json({ message: "Issue retrieving messages from a user's ID" });
    }
  };

  static getAllMessagesWithProfanity = async (req, res) => {
    try {
      const messages = await pool.query(
        "SELECT * FROM messages WHERE profanity_count > 0"
      );
      return res.status(200).json(messages.rows);
    } catch (error) {
      console.error(error.message);
      return res
        .status(500)
        .json({ message: "Issue retrieving profanity messages" });
    }
  };

  static getUserMessagesWithProfanityByUserId = async (req, res) => {
    try {
      const { id } = req.params;
      const messages = await pool.query(
        "SELECT * FROM messages WHERE user_id = $1 AND profanity_count > 0",
        [id]
      );
      return res.status(200).json(messages.rows);
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({
        message: "Issue retrieving profanity message from a user's ID",
      });
    }
  };

  static recordMessage = async (req, res) => {
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

      return res.status(200).json(addMessage.rows);
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ message: "Issue saving link" });
    }
  };

  static getAllMessagesWithLinks = async (req, res) => {
    try {
      const messages = await pool.query(
        "SELECT users.username, users.discriminator, messages.message, messages.channel, messages.date FROM users INNER JOIN messages ON users.user_id = messages.user_id WHERE messages.has_link = true ORDER BY messages.date DESC LIMIT $1",
        [messageUtil.links.limit]
      );
      const sortMessageDate = recentMessageByDate(messages.rows);
      return res.status(200).json(sortMessageDate);
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ message: "Issue retrieving links" });
    }
  };

  static getAllMessagesWithLinksByChannelName = async (req, res) => {
    try {
      const { channel } = req.params;
      const messages = await pool.query(
        "SELECT users.username, users.discriminator, messages.message, messages.channel_id, messages.channel, messages.date FROM users INNER JOIN messages ON users.user_id = messages.user_id WHERE messages.has_link = true AND LOWER(messages.channel) = LOWER($1) ORDER BY messages.date DESC LIMIT $2",
        [channel, messageUtil.links.limit]
      );
      const sortMessageDate = recentMessageByDate(messages.rows);
      return res.status(200).json(sortMessageDate);
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ message: "Issue retrieving links" });
    }
  };

  static getAllMessagesByChannelId = async () => {
    try {
      const { channelId } = req.params;
      const messages = await pool.query(
        "SELECT users.username, users.discriminator, messages.message, messages.channel, messages.date FROM users INNER JOIN messages ON users.user_id = messages.user_id WHERE messages.has_link = true AND messages.channel_id = $1 ORDER BY messages.date DESC LIMIT $2",
        [channelId, messageUtil.links.limit]
      );
      const sortMessageDate = recentMessageByDate(messages.rows);
      return res.status(200).json(sortMessageDate);
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ message: "Issue retrieving links" });
    }
  };

  static getMessagesWithLinksByUsername = async (req, res) => {
    const { username } = req.params;
    try {
      const messages = await pool.query(
        "SELECT users.user_id, users.username, users.discriminator, messages.message, messages.channel, messages.date FROM users INNER JOIN messages ON users.user_id = messages.user_id WHERE LOWER(users.username) = LOWER($1) ORDER BY messages.date DESC LIMIT $2",
        [username, messageUtil.links.limit]
      );
      const sortMessageDate = recentMessageByDate(messages.rows);
      return res.status(200).json(sortMessageDate);
    } catch (error) {
      console.error(error.message);
      return res
        .status(500)
        .json({ message: `Issue retrieving links from ${username}` });
    }
  };
}

module.exports = MessagesController;
