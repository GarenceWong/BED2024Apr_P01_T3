const sql = require('mssql');
const dbConfig = require('../dbConfig');

async function addVerificationDetails(details) {
    let pool = await sql.connect(dbConfig);
    let result = await pool.request()
        .input('housingType', sql.VarChar(50), details.housingType)
        .input('employmentStatus', sql.VarChar(50), details.employmentStatus)
        .input('grossMonthlyIncome', sql.Decimal(10, 2), details.grossMonthlyIncome)
        .input('nricFrontBack', sql.NVarChar(sql.MAX), details.nricFrontBack || null)
        .query(`
            INSERT INTO Verification (housingType, employmentStatus, grossMonthlyIncome, nricFrontBack)
            VALUES (@housingType, @employmentStatus, @grossMonthlyIncome, @nricFrontBack)
        `);
    return result;
}

async function verifyUser(verificationID) {
    let pool = await sql.connect(dbConfig);
    let result = await pool.request()
        .input('verificationID', sql.Int, verificationID)
        .query(`
            UPDATE Verification
            SET VerificationStatus = 1
            WHERE VerificationID = @verificationID
        `);
    return result;
}

async function getVerificationStatus(verificationID) {
    let pool = await sql.connect(dbConfig);
    let result = await pool.request()
        .input('verificationID', sql.Int, verificationID)
        .query(`
            SELECT VerificationStatus
            FROM Verification
            WHERE VerificationID = @verificationID
        `);
    return result.recordset[0];
}

module.exports = {
    addVerificationDetails,
    verifyUser,
    getVerificationStatus
};

