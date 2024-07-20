const { addMedicalReport } = require('../models/doctorappointmentmodel');

const submitMedicalReport = async (req, res) => {
    try {
        const { username, medicalCondition, prescription } = req.body;

        // Call the model function to insert data
        await addMedicalReport(username, medicalCondition, prescription);

        res.status(200).send('Medical report submitted successfully.');
    } catch (err) {
        console.error('Error submitting medical report:', err.message);
        res.status(500).send('Error submitting medical report. Please try again later.');
    }
};

module.exports = { submitMedicalReport };
