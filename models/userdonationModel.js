const sql = require('mssql');
const dbConfig = require('../dbConfig');

async function addDonation(donation) {
    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request()
            .input('username', sql.NVarChar(100), donation.username)
            .input('donationDate', sql.Date, donation.donationDate)
            .input('medicineName', sql.NVarChar(100), donation.medicineName)
            .input('quantity', sql.Int, donation.quantity)
            .query(`
                INSERT INTO Donations (Username, DonationDate, MedicineName, Quantity) 
                VALUES (@username, @donationDate, @medicineName, @quantity)
            `);
        return result;
    } catch (error) {
        throw new Error('Error adding donation: ' + error.message);
    }
}

module.exports = {
    addDonation,
};

