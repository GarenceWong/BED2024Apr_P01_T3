const sql = require('mssql');
const dbConfig = require('../dbConfig');

async function getMedicalReportByUsername(username) {
    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request()
            .input('username', sql.VarChar, username)
            .query('SELECT medicalCondition, prescription FROM MedicalReports WHERE username = @username');
        return result.recordset;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports = {
    getMedicalReportByUsername
};
