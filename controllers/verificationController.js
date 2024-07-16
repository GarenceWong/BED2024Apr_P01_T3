const { addVerificationDetails, verifyUser, getVerificationStatus } = require('../models/verification');

async function submitVerificationDetails(req, res) {
    try {
        const details = {
            housingType: req.body.housingType,
            employmentStatus: req.body.employmentStatus,
            grossMonthlyIncome: req.body.grossMonthlyIncome,
            cpfContributionHistory: req.files && req.files.cpfContributionHistory ? req.files.cpfContributionHistory.name : null,
            nricFrontBack: req.files && req.files.nricFrontBack ? req.files.nricFrontBack.name : null
        };

        const result = await addVerificationDetails(details);
        console.log('Verification details submitted successfully:', result);
        res.status(200).json({ message: 'Verification details submitted successfully.', result });
    } catch (err) {
        console.error('Error submitting verification details:', err.message);
        res.status(500).json({ message: 'Error submitting verification details. Please try again later.', error: err.message });
    }
}

async function verifyUserHandler(req, res) {
    try {
        const verificationID = req.body.verificationID;
        const result = await verifyUser(verificationID);
        console.log('Verification completed successfully:', result);
        res.status(200).json({ message: 'Verification completed successfully.', result });
    } catch (err) {
        console.error('Error verifying:', err.message);
        res.status(500).json({ message: 'Error verifying. Please try again later.', error: err.message });
    }
}

async function checkVerificationStatus(req, res) {
    try {
        const verificationID = req.params.verificationID;
        const status = await getVerificationStatus(verificationID);
        console.log('Fetched verification status:', status);
        res.status(200).json(status);
    } catch (err) {
        console.error('Error fetching verification status:', err.message);
        res.status(500).json({ message: 'Error fetching verification status. Please try again later.', error: err.message });
    }
}

module.exports = {
    submitVerificationDetails,
    verifyUserHandler,
    checkVerificationStatus
};
