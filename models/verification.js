const sql = require('mssql');
const dbConfig = require('../dbConfig');

// Function to add verification details
async function addVerificationDetails(details) {
    try {
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
        return result;
    } catch (error) {
        console.error('SQL error:', error);
        throw new Error('Database query failed');
    }
}

// Function to update verification status
async function updateVerificationStatus(verificationID, status) {
    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request()
            .input('verificationID', sql.Int, verificationID)
            .input('status', sql.VarChar(50), status)
            .query(`
                UPDATE Verification
                SET VerificationStatus = @status
                WHERE VerificationID = @verificationID
            `);
        return result;
    } catch (error) {
        console.error('SQL error:', error);
        throw new Error('Database query failed');
    }
}

module.exports = {
    addVerificationDetails,
    updateVerificationStatus
};







