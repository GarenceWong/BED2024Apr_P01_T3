const { addDonation } = require('../models/userdonationModel');

async function handleAddDonation(req, res) {
    try {
        const { username, donationDate, medicineName, quantity } = req.body;
        const donation = { username, donationDate, medicineName, quantity };
        await addDonation(donation);
        res.status(200).send('Donation added successfully.');
    } catch (error) {
        console.error('Error adding donation:', error.message);
        res.status(500).send('Error adding donation. Please try again later.');
    }
}

module.exports = {
    handleAddDonation,
};
