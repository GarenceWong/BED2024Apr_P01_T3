const { getAllVerification, getVerificationById } = require('../models/verifyModel');

async function getVerification(req, res) {
    try {
        const verification = await getAllVerification();
        res.json(verification);
        console.log('Fetched successfully');
    } catch (error) {
        console.error('Error fetching donations from verification:', error.message);
        res.status(500).json({ error: 'Failed to fetch verification' });
    }
}

async function getVerificationByIdHandler(req, res) {
    try {
        const id = req.params.id; // Ensure you are using the correct parameter name
        const verification = await getVerificationById(id);
        if (!verification) {
            return res.status(404).json({ error: 'Verification not found' });
        }
        res.json(verification);
        console.log('Fetched verification details successfully');
    } catch (error) {
        console.error('Error fetching verification details:', error.message);
        res.status(500).json({ error: 'Failed to fetch verification details' });
    }
}

module.exports = { getVerification, getVerificationByIdHandler };