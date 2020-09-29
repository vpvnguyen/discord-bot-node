const express = require("express");
const router = express.Router();
const UsersController = require("../controller/users.controller");

router.get("/users", async (req, res) => UsersController.getAllUsers(req, res));

router.get("/user/:id", async (req, res) =>
  UsersController.getUserById(req, res)
);

router.get("/user/:username/:discriminator", async (req, res) =>
  UsersController.getUserByUsernameAndDiscriminator(req, res)
);

router.post("/user/:userId/:username/:discriminator", async (req, res) =>
  UsersController.addCurrentUser(req, res)
);

router.post("/user/:username/:discriminator/:role", async (req, res) =>
  UsersController.createNewUser(req, res)
);

router.put("/user/update-role", async (req, res) =>
  UsersController.updateUserRoleByDiscordUserId(req, res)
);

router.delete("/user/:id", async (req, res) =>
  UsersController.deleteUserById(req, res)
);

router.delete("/user/:userId", async (req, res) =>
  UsersController.deleteUserByDiscordUserId(req, res)
);

module.exports = router;
