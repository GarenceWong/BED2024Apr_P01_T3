const { getAllVerification, getVerificationById, updateStatus } = require('../models/verifyModel');

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

  async function verifyUser(req, res) {
    const { id } = req.body;

    if (!id) {
        return res.status(400).send('ID is required');
    }

    try {
        const result = await updateStatus(id);
        console.log('Rows affected:', result.rowsAffected); // Log the rows affected for debugging
        
        if (result.rowsAffected > 0) {
            res.send('Verification status updated successfully');
        } else {
            res.status(404).send('Verification record not found');
        }
    } catch (err) {
        console.error('Error updating verification status:', err.message);
        res.status(500).send('Error updating verification status: ' + err.message);
    }
}

module.exports = { getVerification, getVerificationByIdHandler, verifyUser};