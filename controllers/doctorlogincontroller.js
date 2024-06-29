const Doctor = require("../models/doctorloginmodel");

exports.doctorLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Attempt to find the doctor by username
    const doctor = await Doctor.getDoctorByUsername(username);

    // If no doctor found, return an error response
    if (!doctor) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Check if the passwords match
    if (doctor.password !== password) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // If credentials are correct, return a success response
    res.status(200).json({
      id: doctor.id,
      username: doctor.username,
    });
  } catch (err) {
    // Handle server errors (e.g., database connection issues)
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
