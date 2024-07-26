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

async function updateMedicineStock(id, stock) {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('stock', sql.Int, stock)
            .query('UPDATE medicine SET stock = @stock WHERE id = @id');
        return result.rowsAffected[0]; // Get affected rows count
    } catch (err) {
        throw new Error('Database query failed: ' + err.message);
    }
}

module.exports = {
    getAllMedicines,
    updateMedicineStock 
};
