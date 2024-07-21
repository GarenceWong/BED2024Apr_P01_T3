const { getAllDonations } = require('../models/donationsModel.js');

async function getDonations(req, res) {
  try {
    const donations = await getAllDonations();
    res.json(donations);
    console.log('Fetched successfully');
  } catch (error) {
    console.error('Error fetching donations from database:', error.message);
    res.status(500).json({ error: 'Failed to fetch donations' });
  }
}

module.exports = { getDonations };

