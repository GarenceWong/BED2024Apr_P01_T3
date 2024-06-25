const User = require("../models/user");

// Controller function for user signup
async function signup(req, res, next) {
  const { username, email, password, number } = req.body;

  try {
    const newUser = await User.createUser(username, email, password, number);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error signing up:", error.message);
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
}

// Controller function for user login (not implemented here)
async function login(req, res, next) {
  res.status(501).json({ message: "Login functionality not implemented" });
}

module.exports = { signup, login };


