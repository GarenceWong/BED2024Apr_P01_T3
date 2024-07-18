const { deleteAppointment, updateAppointment, getAppointmentById } = require('../models/userappointmentModel');
 
async function handleDeleteAppointment(req, res) {
    const appointmentId = req.params.id;
    try {
        console.log(`Deleting appointment with ID: ${appointmentId}`);
        await deleteAppointment(appointmentId);
        res.status(200).json({ success: true, message: 'Appointment deleted successfully' });
    } catch (error) {
        console.error('Error deleting appointment:', error);
        res.status(500).json({ success: false, error: error.message });
    }
}
 
async function handleUpdateAppointment(req, res) {
    const { id, timeslotDate, timeslotTime } = req.body;
    try {
        console.log(`Updating appointment ID: ${id} to date: ${timeslotDate} and time: ${timeslotTime}`);
        await updateAppointment(id, timeslotDate, timeslotTime);
        res.status(200).json({ success: true, message: 'Appointment updated successfully' });
    } catch (error) {
        console.error('Error updating appointment:', error.message);
        console.error('Request body:', req.body); // Log the request body
        res.status(500).json({ success: false, error: error.message });
    }
}
 
 
 
async function getUserAppointment(req, res) {
    const appointmentId = req.params.id;
    try {
        console.log(`Fetching appointment with ID: ${appointmentId}`);
        const appointment = await getAppointmentById(appointmentId);
        res.status(200).json(appointment);
    } catch (error) {
        console.error('Error fetching appointment:', error);
        res.status(500).json({ success: false, error: error.message });
    }
}
 
module.exports = {
    handleDeleteAppointment,
    handleUpdateAppointment,
    getUserAppointment
};





