const sql = require("mssql");
const dbConfig = require("../dbConfig");

// Function to fetch all timeslots from the database
async function getAllTimeslots() {
    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request().query('SELECT * FROM Timeslots');
        return result.recordset;
    } catch (error) {
        console.error('Error fetching timeslots:', error.message);
        throw error;
    }
}

module.exports = {
    getAllTimeslots,
};