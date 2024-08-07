const Admin = require("../models/admin");

exports.adminLogin = async (req, res) => {
    const {
        email,
        password
    } = req.body;

    try {
        const admin = await Admin.getAdminByEmail(email);
        if (!admin) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const isPasswordValid = await admin.validatePassword(password);
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        res.status(200).json({
            message: "Login successful"
        });

    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
};

