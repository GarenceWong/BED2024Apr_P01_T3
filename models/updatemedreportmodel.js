const sql = require("mssql");
const dbConfig = require("../dbConfig");

const updateMedicalReportModel = async (username, medicalCondition, prescription) => {
    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request()
            .input('username', sql.VarChar(255), username)
            .input('medicalCondition', sql.VarChar(255), medicalCondition)
            .input('prescription', sql.Text, prescription)
            .query(`
                UPDATE MedicalReports
                SET medicalCondition = @medicalCondition,
                    prescription = @prescription
                WHERE username = @username
            `);
        console.log('SQL query result:', result); // Debugging
        return result;
    } catch (err) {
        console.error('Error updating medical report in model:', err.message);
        throw new Error('Failed to update medical report');
    }
};

module.exports = {
    updateMedicalReportModel
};
