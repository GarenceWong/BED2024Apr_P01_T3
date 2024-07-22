const sql = require("mssql");
const dbConfig = require("../dbConfig");

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

async function updateTimeslot(id, status) {
    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request()
            .input('id', sql.Int, id)
            .input('status', sql.VarChar(20), status)
            .query('UPDATE Timeslots SET status = @status WHERE id = @id');
        return result;
    } catch (error) {
        console.error('Error updating timeslot status:', error.message);
        throw error;
    }
}

module.exports = { getAllTimeslots, updateTimeslot };
