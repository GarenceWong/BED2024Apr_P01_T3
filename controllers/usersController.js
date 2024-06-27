// usersController.js
const User = require("../models/user");
const Login = require("../models/login");
const bcrypt = require("bcrypt");
 
exports.signup = async (req, res) => {
  const { username, email, password, number } = req.body;
 
  try {
    const existingUser = await User.getUserByEmail(email);
 
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
 
    const newUser = await User.createUser(username, email, password, number);
    res.status(201).json({ message: "User created successfully", newUser });
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
 
exports.login = async (req, res) => {
  const { email, password } = req.body;
 
  try {
    const user = await User.getUserByEmail(email);
 
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
 
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
 
    const newLogin = await Login.createLogin(user.id);
    res.status(200).json({ message: "Login successful", newLogin });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};



