const { addTimeslot, fetchTimeslots, createNewTimeslot } = require('../models/timeslotModel');

async function createTimeslot(req, res) {
    try {
        const { username, timeslotDate, timeslotTime, status } = req.body;

        console.log('Received data:', { username, timeslotDate, timeslotTime, status });

        const result = await addTimeslot({ username, timeslotDate, timeslotTime, status });

        console.log('Timeslot added successfully:', result);
        res.status(200).send('Timeslot added successfully.');
    } catch (err) {
        console.error('Error adding new timeslot:', err.message); // Log the detailed error
        res.status(500).send(`Error adding new timeslot: ${err.message}`);
    }
}


async function getTimeslots(req, res) {
    try {
        const username = req.query.username;
        const timeslots = await fetchTimeslots(username);
        res.json(timeslots);
    } catch (error) {
        console.error('Error fetching timeslots:', error.message); // Log the detailed error
        res.status(500).json({ error: 'Failed to fetch timeslots' });
    }
}

const addNewTimeslot = async (req, res) => {
    const { timeslotDate, timeslotTime, username } = req.body;

    if (!timeslotDate || !timeslotTime || !username) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        await createNewTimeslot(timeslotDate, timeslotTime, username);
        res.status(201).json({ message: 'Timeslot added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add timeslot' });
    }
};

module.exports = {
    createTimeslot,
    getTimeslots,
    addNewTimeslot
};




