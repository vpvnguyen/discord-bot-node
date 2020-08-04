const express = require("express");
const router = express.Router();
const pool = require("../config/db.config");

router.get("/users", async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM users");
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
    res.status(500).json({ message: "Issue retrieving user by ID" });
  }
});

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
