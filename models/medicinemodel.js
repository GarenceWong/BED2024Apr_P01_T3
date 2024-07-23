const sql = require("mssql");
const dbConfig = require("../dbConfig");

async function getAllMedicines() {
    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request().query('SELECT * FROM medicine');
        return result.recordset;
    } catch (error) {
        console.error('Error fetching medicines from database:', error.message);
        throw new Error('Failed to fetch medicines');
    }
}

module.exports = {
    getAllMedicines
};
