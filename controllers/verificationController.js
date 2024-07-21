const Verification = require("../models/verification");

exports.submitVerificationDetails = async (req, res) => {
  const { userName, housingType, employmentStatus, grossMonthlyIncome, nric } = req.body;

  console.log("Received form data:", req.body);

  if (!userName || !housingType || !employmentStatus || !grossMonthlyIncome || !nric) {
    console.error("Missing fields in form data");
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newVerification = await Verification.createVerification(
      userName,
      housingType,
      employmentStatus,
      grossMonthlyIncome,
      nric
    );

    if (newVerification) {
      console.log("Verification details submitted successfully:", newVerification);
      res.status(201).json({ message: "Verification details submitted successfully", newVerification });
    } else {
      console.error("Failed to submit verification details");
      res.status(400).json({ message: "Failed to submit verification details" });
    }
  } catch (err) {
    console.error("Error submitting verification details:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
