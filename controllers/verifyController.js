const { getAllVerification } = require('../models/verifyModel');

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


module.exports = { getVerification };