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
        console.log(`Preparing to update appointment ID: ${appointmentId} with date: ${newDate} and time: ${newTime}`);
       
        // Ensure newTime is in the correct format
        let formattedTime = newTime;
        if (newTime.length === 5) {
            formattedTime = `${newTime}:00`;
        }
 
        console.log(`Formatted Time: ${formattedTime}`);
 
        let pool = await sql.connect(dbConfig);
        let query = `
            UPDATE Timeslots
            SET timeslotDate = @newDate, timeslotTime = @newTime
            WHERE id = @id
        `;
       
        console.log(`Query: ${query}`);
        console.log(`Parameters: id=${appointmentId}, newDate=${newDate}, newTime=${formattedTime}`);
 
        await pool.request()
            .input('id', sql.Int, appointmentId)
            .input('newDate', sql.Date, newDate)
            .input('newTime', sql.VarChar(8), formattedTime) // Change to VARCHAR for time
            .query(query);
 
        console.log(`Appointment ID: ${appointmentId} updated successfully.`);
    } catch (error) {
        console.error('SQL error:', error.message);
        throw error;
    }
}

async function getAppointmentById(appointmentId) {
    try {
        let pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input('id', sql.Int, appointmentId)
            .query('SELECT * FROM Timeslots WHERE id = @id');
        return result.recordset[0];
    } catch (error) {
        console.error('SQL error:', error);
        throw error;
    }
}
 
module.exports = {
    deleteAppointment,
    updateAppointment,
    getAppointmentById
};





