const sql = require('mssql');
const dbConfig = require('../dbConfig');

const addMedicalReport = async (username, medicalCondition, prescription) => {
    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request()
            .input('username', sql.VarChar(255), username)
            .input('medicalCondition', sql.VarChar(255), medicalCondition)
            .input('prescription', sql.Text, prescription)
            .query('INSERT INTO MedicalReports (username, medicalCondition, prescription) VALUES (@username, @medicalCondition, @prescription)');

        console.log('Insert result:', result); // Log insert result

        return result;
    } catch (err) {
        console.error('Error inserting medical report:', err.message); // Log error
        throw new Error(`Error inserting medical report: ${err.message}`);
    }
};

module.exports = { addMedicalReport };

