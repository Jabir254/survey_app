const bcrypt = require("bcrypt");
const User = require("../models/User");

//register new user
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the email is already taken
    const existingUser = await User.findOne({ email, username });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already taken" });
    }

    // Hash the password
    const newPassword = password.toString();
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Create a new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Respond with the created user
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error during user registration:", error);
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

    // ensure both the stored password and the input password are strings
    const storedPassword = user.password.toString(); // convert to string if not already
    const inputPassword = password.toString(); // convert to string if not already

    // compare the password
    const pwMatch = await bcrypt.compare(inputPassword, storedPassword);

    if (!pwMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Passwords match, you can proceed with login logic here

    // Example: return a success response
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to login" });
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
