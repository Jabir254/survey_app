const bcrypt = require("bcrypt");
const User  = require("../models/User");

//register new user
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    //if username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "username is already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to register user" });
  }
};

//Controller to authenticate and log in a user
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    //find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    //compare the password
    const pwMatch = await bcrypt.compare(password, user.password);
    if (!pwMatch) {
      return res.status(401).json({ erro: "invalid username or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Failed to login" });
  }
};

// Controller to get the authenticated user
const getAuthenticatedUser = async (req, res) => {
  const { user } = req;
  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Exclude sensitive information (like password) before sending the user object
  const { _id, username } = user;
  res.status(200).json({ _id, username });
};

module.exports = {
  registerUser,
  loginUser,
  getAuthenticatedUser,
};
