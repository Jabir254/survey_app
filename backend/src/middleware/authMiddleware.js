const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const User = require("../models/User");

// Implement authentication middleware here
const generateToken = (user) => {
  const payload = { user: { id: user.id } };

  return jwt.sign(payload, config.jwtSecret, { expiresIn: "1h" });
};

const authenticateUser = async (req, res, next) => {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, config.jwtSecret);

    // Add user from payload
    req.user = await User.findById(decoded.user.id).select("-password"); // Exclude password from user object

    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = { generateToken, authenticateUser };
