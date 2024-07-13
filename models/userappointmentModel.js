const sql = require('mssql');
const dbConfig = require('../dbConfig');

async function deleteAppointment(appointmentId) {
    try {
        let pool = await sql.connect(dbConfig);
        await pool.request()
            .input('id', sql.Int, appointmentId)
            .query('DELETE FROM Timeslots WHERE id = @id');
    } catch (error) {
        console.error('SQL error:', error);
        throw error;
    }
}

async function updateAppointment(appointmentId, newDate, newTime) {
    try {
        let pool = await sql.connect(dbConfig);
        await pool.request()
            .input('id', sql.Int, appointmentId)
            .input('newDate', sql.Date, newDate)
            .input('newTime', sql.Time, newTime) // TIME type for SQL
            .query('UPDATE Timeslots SET timeslotDate = @newDate, timeslotTime = @newTime WHERE id = @id');
    } catch (error) {
        console.error('SQL error:', error);
        throw error;
    }
}

module.exports = {
    deleteAppointment,
    updateAppointment
};






