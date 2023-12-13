const express = require("express");
const authController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

//register a new user
router.post("/register", authController.registerUser);

//authenticate and log in user
router.post("/login", authController.loginUser);

//get authenticated user
router.get(
  "/me",
  authMiddleware.authenticateUser,
  authController.getAuthenticatedUser
);

module.exports = router;
