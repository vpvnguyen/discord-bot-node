const express = require("express");
const router = express.Router();
const pool = require("../config/db.config");
const axios = require("axios");

router.get("/users", async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM users");
    console.log(users.rows);
    res.status(200).json(users.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Issue retrieving users" });
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      id,
    ]);
    res.status(200).json(user.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Issue retrieving user" });
  }
});

module.exports = router;
