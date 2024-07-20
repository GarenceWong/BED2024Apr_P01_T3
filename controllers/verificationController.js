const sql = require('mssql');
const dbConfig = require('../dbConfig');

async function submitVerificationDetails(req, res) {
    try {
        const details = {
            housingType: req.body.housingType,
            employmentStatus: req.body.employmentStatus,
            grossMonthlyIncome: req.body.grossMonthlyIncome,
            nricFrontBack: req.body.nricFrontBack
        };

        let pool = await sql.connect(dbConfig);
        let result = await pool.request()
            .input('housingType', sql.VarChar(50), details.housingType)
            .input('employmentStatus', sql.VarChar(50), details.employmentStatus)
            .input('grossMonthlyIncome', sql.VarChar(50), details.grossMonthlyIncome)
            .input('nricFrontBack', sql.NVarChar(sql.MAX), details.nricFrontBack)
            .query(`
                INSERT INTO Verification (HousingType, EmploymentStatus, GrossMonthlyIncome, NRICFrontBack, VerificationStatus)
                VALUES (@housingType, @employmentStatus, @grossMonthlyIncome, @nricFrontBack, 'Pending')
            `);

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
    try {
        const { verificationID } = req.params;

        let pool = await sql.connect(dbConfig);
        let result = await pool.request()
            .input('verificationID', sql.Int, verificationID)
            .query('SELECT VerificationStatus FROM Verification WHERE VerificationID = @verificationID');

        res.status(200).json(result.recordset[0]);
    } catch (err) {
        console.error('Error checking verification status:', err.message);
        res.status(500).json({ message: 'Error checking verification status. Please try again later.', error: err.message });
    }
}

async function getVerifications(req, res) {
    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request().query('SELECT * FROM Verification');
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error fetching verifications from database:', error.message);
        res.status(500).json({ error: 'Failed to fetch verifications' });
    }
}

async function updateVerificationStatus(req, res) {
    try {
        const { verificationID, status } = req.body;

        let pool = await sql.connect(dbConfig);
        let result = await pool.request()
            .input('verificationID', sql.Int, verificationID)
            .input('status', sql.VarChar(50), status)
            .query(`
                UPDATE Verification
                SET VerificationStatus = @status
                WHERE VerificationID = @verificationID
            `);

        res.status(200).json({ message: 'Verification status updated successfully.', result });
    } catch (err) {
        console.error('Error updating verification status:', err.message);
        res.status(500).json({ message: 'Error updating verification status. Please try again later.', error: err.message });
    }
}

module.exports = {
    submitVerificationDetails,
    verifyUserHandler,
    checkVerificationStatus,
    getVerifications,
    updateVerificationStatus
};








