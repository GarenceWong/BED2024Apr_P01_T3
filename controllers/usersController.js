// usersController.js
const sql = require("mssql");
const bcrypt = require("bcrypt");
const dbConfig = require("../../dbconfig")
const User = require("../models/user");

async function signup(req, res, next) {
  const { username, email, password, number } = req.body;

  try {
    const newUser = await User.createUser(username, email, password, number);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error signing up:", error.message, error.stack);
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
}

async function login(req, res, next) {
  res.status(501).json({ message: "Login functionality not implemented" });
}

module.exports = { signup, login };



