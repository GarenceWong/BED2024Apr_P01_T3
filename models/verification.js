const sql = require('mssql');
const dbConfig = require('../dbConfig');

async function addVerificationDetails(details) {
    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request()
            .input('housingType', sql.VarChar(50), details.housingType)
            .input('employmentStatus', sql.VarChar(50), details.employmentStatus)
            .input('grossMonthlyIncome', sql.VarChar(50), details.grossMonthlyIncome)
            .input('nricFrontBack', sql.NVarChar(sql.MAX), details.nricFrontBack || null)
            .query(`
                INSERT INTO Verification (housingType, employmentStatus, grossMonthlyIncome, nricFrontBack)
                VALUES (@housingType, @employmentStatus, @grossMonthlyIncome, @nricFrontBack)
            `);
        return result;
    } catch (error) {
        console.error('SQL error:', error);
        throw new Error('Database query failed');
    }
}

module.exports = {
    addVerificationDetails
};




