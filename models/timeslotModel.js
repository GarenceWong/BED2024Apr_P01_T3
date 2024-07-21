const sql = require('mssql');
const dbConfig = require('../dbConfig');
 
async function addTimeslot(timeslot) {
    let pool;
    try {
        pool = await sql.connect(dbConfig);
       
        let result = await pool.request()
            .input('username', sql.VarChar(100), timeslot.username)
            .input('timeslotDate', sql.Date, timeslot.timeslotDate)
            .input('timeslotTime', sql.VarChar(10), timeslot.timeslotTime) // Store the time as a string
            .input('status', sql.VarChar(20), timeslot.status)
            .query('INSERT INTO Timeslots (username, timeslotDate, timeslotTime, status) VALUES (@username, @timeslotDate, @timeslotTime, @status)');
        return result;
    } catch (error) {
        console.error('Error executing query:', error.message); // Log the detailed error
        throw error;
    } finally {
        if (pool) {
            pool.close();
        }
    }
}

 
async function fetchTimeslots(username) {
    let pool;
    try {
        pool = await sql.connect(dbConfig);
        let result = await pool.request()
            .input('username', sql.VarChar(100), username)
            .query('SELECT * FROM Timeslots WHERE username = @username');
        return result.recordset;
    } catch (error) {
        console.error('Error fetching timeslots from database:', error.message); // Log the detailed error
        throw error;
    } finally {
        if (pool) {
            pool.close();
        }
    }
}
 
module.exports = {
    addTimeslot,
    fetchTimeslots
};







