const express = require("express");
const router = express.Router();
const pool = require("../config/db.config");

// get all users
router.get("/users", async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM users");
    res.status(200).json(users.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Issue retrieving users" });
  }
});

// get user by user id
router.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      id,
    ]);
    res.status(200).json(user.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Issue retrieving user by ID" });
  }
});

// delete user by user id
router.delete("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await pool.query("DELETE FROM users WHERE id = $1", [id]);
    res.status(200).json({ message: `User ${id} has been deleted` });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Issue deleting user by ID" });
  }
});

// delete user by discord user_id
router.delete("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await pool.query("DELETE FROM users WHERE user_id = $1", [
      userId,
    ]);
    res.status(200).json({ message: `UserID ${userId} has been deleted` });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Issue deleting user" });
  }
});

// update user's role by discord user_id
router.put("/user/update-role", async (req, res) => {
  try {
    const { userId, role } = req.body;
    const updateRole = await pool.query(
      "UPDATE users SET role = $1 WHERE user_id = $2 RETURNING *",
      [role, userId]
    );
    res.status(200).json(updateRole.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Issue updating user's role" });
  }
});

// get user & discord user data by username#discriminator
router.get("/user/:username/:discriminator", async (req, res) => {
  try {
    const { username, discriminator } = req.params;
    const user = await pool.query(
      "SELECT * FROM users WHERE username = $1 AND discriminator = $2",
      [username, discriminator]
    );
    res.status(200).json(user.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Issue retrieving a user by user's tag" });
  }
});

// add current user
router.post("/user/:userId/:username/:discriminator", async (req, res) => {
  try {
    console.log("server");

    const { userId, username, discriminator } = req.params;
    const user = await pool.query(
      "INSERT INTO users (user_id, username, discriminator, role) VALUES ($1, $2, $3, $4) RETURNING *",
      [userId, username, discriminator, "user"]
    );
    res.status(200).json(user.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Issue adding current user" });
  }
});

// create new user; refactor to call discord API for more info
router.post("/user/:username/:discriminator/:role", async (req, res) => {
  try {
    const { username, discriminator, role } = req.params;
    const user = await pool.query(
      "INSERT INTO users (username, discriminator, role) VALUES ($1, $2, $3) RETURNING *",
      [username, discriminator, role]
    );
    res.status(200).json(user.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Issue creating a user" });
  }
});

module.exports = router;
