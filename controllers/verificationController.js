const { addVerificationDetails } = require('../models/verification');
const path = require('path');

async function submitVerificationDetails(req, res) {
    try {
        const details = {
            housingType: req.body.housingType,
            employmentStatus: req.body.employmentStatus,
            grossMonthlyIncome: req.body.grossMonthlyIncome
        };

        if (req.files) {
            if (req.files.cpfContributionHistory) {
                const cpfFile = req.files.cpfContributionHistory;
                const cpfFilePath = path.join(__dirname, '../uploads', cpfFile.name);
                await cpfFile.mv(cpfFilePath);
                details.cpfContributionHistory = cpfFile.name;
            }
            if (req.files.nricFrontBack) {
                const nricFile = req.files.nricFrontBack;
                const nricFilePath = path.join(__dirname, '../uploads', nricFile.name);
                await nricFile.mv(nricFilePath);
                details.nricFrontBack = nricFile.name;
            }
        }

        const result = await addVerificationDetails(details);
        console.log('Verification details submitted successfully:', result);
        res.status(200).json({ message: 'Verification details submitted successfully.', result });
    } catch (err) {
        console.error('Error submitting verification details:', err.message);
        res.status(500).json({ message: 'Error submitting verification details. Please try again later.', error: err.message });
    }
}

async function verifyUserHandler(req, res) {
    // Placeholder for the function implementation
}

async function checkVerificationStatus(req, res) {
    // Placeholder for the function implementation
}

module.exports = {
    submitVerificationDetails,
    verifyUserHandler,
    checkVerificationStatus
};
