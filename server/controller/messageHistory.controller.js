const express = require("express");
const router = express.Router();
const pool = require("../config/db.config");

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
    res.status(500).json({ message: "Issue retrieving user messages" });
  }
});

module.exports = router;
