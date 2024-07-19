const sql = require('mssql');
const dbConfig = require('../dbConfig');

const submitMedicalReport = async (req, res) => {
    try {
        const { username, medicalCondition, prescription } = req.body;

        let pool = await sql.connect(dbConfig);
        await pool.request()
            .input('username', sql.VarChar(255), username)
            .input('medicalCondition', sql.VarChar(255), medicalCondition)
            .input('prescription', sql.Text, prescription)
            .query('INSERT INTO MedicalReports (username, medicalCondition, prescription) VALUES (@username, @medicalCondition, @prescription)');

        res.status(200).send('Medical report submitted successfully.');
    } catch (err) {
        console.error('Error submitting medical report:', err.message);
        res.status(500).send('Error submitting medical report. Please try again later.');
    }
};

module.exports = { submitMedicalReport };
