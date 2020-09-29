const pool = require("../config/db.config");

class UsersController {
  static getAllUsers = async (req, res) => {
    try {
      const users = await pool.query("SELECT * FROM users");
      return res.status(200).json(users.rows);
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ message: "Issue retrieving users" });
    }
  };

  static getUserById = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [
        id,
      ]);
      return res.status(200).json(user.rows);
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ message: "Issue retrieving user by ID" });
    }
  };

  static deleteUserById = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await pool.query("DELETE FROM users WHERE id = $1", [id]);
      return res.status(200).json({ message: `User ${id} has been deleted` });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ message: "Issue deleting user by ID" });
    }
  };

  static deleteUserByDiscordUserId = async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await pool.query("DELETE FROM users WHERE user_id = $1", [
        userId,
      ]);
      return res
        .status(200)
        .json({ message: `UserID ${userId} has been deleted` });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ message: "Issue deleting user" });
    }
  };

  static updateUserRoleByDiscordUserId = async (req, res) => {
    try {
      const { userId, role } = req.body;
      const updateRole = await pool.query(
        "UPDATE users SET role = $1 WHERE user_id = $2 RETURNING *",
        [role, userId]
      );
      return res.status(200).json(updateRole.rows);
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ message: "Issue updating user's role" });
    }
  };

  static getUserByUsernameAndDiscriminator = async (req, res) => {
    try {
      const { username, discriminator } = req.params;
      const user = await pool.query(
        "SELECT * FROM users WHERE username = $1 AND discriminator = $2",
        [username, discriminator]
      );
      return res.status(200).json(user.rows);
    } catch (error) {
      console.error(error.message);
      return res
        .status(500)
        .json({ message: "Issue retrieving a user by user's tag" });
    }
  };

  static addCurrentUser = async (req, res) => {
    try {
      console.log("server");

      const { userId, username, discriminator } = req.params;
      const user = await pool.query(
        "INSERT INTO users (user_id, username, discriminator, role) VALUES ($1, $2, $3, $4) RETURNING *",
        [userId, username, discriminator, "user"]
      );
      return res.status(200).json(user.rows);
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ message: "Issue adding current user" });
    }
  };

  // refactor to call discord api for more information
  static createNewUser = async (req, res) => {
    try {
      const { username, discriminator, role } = req.params;
      const user = await pool.query(
        "INSERT INTO users (username, discriminator, role) VALUES ($1, $2, $3) RETURNING *",
        [username, discriminator, role]
      );
      return res.status(200).json(user.rows);
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ message: "Issue creating a user" });
    }
  };

  static consoleLog = () => console.log("Logged");
}

module.exports = UsersController;
