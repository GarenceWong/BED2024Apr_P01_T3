const User = require("../models/user");
const Login = require("../models/login");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.getUserByEmail(email);

    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const newLogin = await Login.createLogin(user.id);
    res.status(200).json(newLogin);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getUserLogins = async (req, res) => {
  const userId = req.params.userId;

  try {
    const logins = await Login.getLoginsByUserId(userId);
    res.status(200).json(logins);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
