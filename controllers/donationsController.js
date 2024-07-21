const { getAllDonations, deleteDonationById } = require('../models/donationsModel');

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

async function deleteDonation(req, res) {
    const { id } = req.params;
    try {
        await deleteDonationById(id);
        res.status(200).send('Donation deleted successfully');
    } catch (error) {
        console.error('Error deleting donation from database:', error.message);
        res.status(500).json({ error: 'Failed to delete donation' });
    }
}

module.exports = { getDonations, deleteDonation };
