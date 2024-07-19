const { addVerificationDetails } = require('../models/verification');

async function submitVerificationDetails(req, res) {
    try {
        const details = {
            housingType: req.body.housingType,
            employmentStatus: req.body.employmentStatus,
            grossMonthlyIncome: req.body.grossMonthlyIncome,
            nricFrontBack: req.body.nricFrontBack
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
    res.status(501).json({ message: 'verifyUserHandler not implemented yet.' });
}

async function checkVerificationStatus(req, res) {
    res.status(501).json({ message: 'checkVerificationStatus not implemented yet.' });
}

module.exports = {
    submitVerificationDetails,
    verifyUserHandler,
    checkVerificationStatus
};




