const { deleteAppointment, updateAppointment } = require('../models/userappointmentModel');

async function handleDeleteAppointment(req, res) {
    const appointmentId = req.params.id;
    try {
        console.log(`Deleting appointment with ID: ${appointmentId}`);
        await deleteAppointment(appointmentId);
        res.status(200).send({ success: true });
    } catch (error) {
        console.error('Error deleting appointment:', error);
        res.status(500).send({ success: false, error: error.message });
    }
}

async function handleUpdateAppointment(req, res) {
    const { id, newDate, newTime } = req.body;
    try {
        console.log(`Updating appointment ID: ${id} to date: ${newDate} and time: ${newTime}`);
        await updateAppointment(id, newDate, newTime);
        res.status(200).send({ success: true });
    } catch (error) {
        console.error('Error updating appointment:', error);
        res.status(500).send({ success: false, error: error.message });
    }
}

module.exports = {
    handleDeleteAppointment,
    handleUpdateAppointment
};




