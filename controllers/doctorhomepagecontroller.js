const { getAllTimeslots, updateTimeslot } = require('../models/doctorhomepagemodel');

async function getTimeslots(req, res) {
    try {
        const timeslots = await getAllTimeslots();
        res.status(200).json(timeslots);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch timeslots' });
    }
}

async function updateTimeslotStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const result = await updateTimeslot(id, status);
        if (result.rowsAffected[0] === 0) {
            return res.status(404).send('Timeslot not found');
        }
        res.status(200).send('Timeslot status updated successfully');
    } catch (error) {
        console.error('Error updating timeslot status:', error.message);
        res.status(500).send('Failed to update timeslot status');
    }
}

module.exports = {
    getTimeslots,
    updateTimeslotStatus
};
