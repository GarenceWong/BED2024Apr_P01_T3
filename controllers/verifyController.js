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
      const id = req.params.id;
      const verification = await getVerificationById(id);
      res.json(verification);
      console.log('Fetched verification details successfully');
    } catch (error) {
      console.error('Error fetching verification details from database:', error.message);
      res.status(500).json({ error: 'Failed to fetch verification details' });
    }
  }

module.exports = { getVerification, getVerificationByIdHandler };