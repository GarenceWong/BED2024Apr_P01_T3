const sql = require("mssql");
const dbConfig = require("../dbConfig");

const getMedicalReports = async () => {
    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request().query('SELECT * FROM MedicalReports');
        return result.recordset;
    } catch (err) {
        console.error("Error fetching medical reports:", err.message);
        throw new Error('Failed to fetch medical reports');
    }
};

module.exports = { getMedicalReports };
