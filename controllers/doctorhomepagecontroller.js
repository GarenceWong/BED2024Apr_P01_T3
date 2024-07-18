const { getAllTimeslots } = require('../models/doctorhomepagemodel');

async function getTimeslots(req, res) {
    try {
        const timeslots = await getAllTimeslots();
        res.status(200).json(timeslots);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch timeslots' });
    }
}

module.exports = {
    getTimeslots,
};
