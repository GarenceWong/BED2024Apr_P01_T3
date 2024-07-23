const { updateMedicalReportModel } = require('../models/updatemedreportmodel');

const updateMedicalReport = async (req, res) => {
    const { username, medicalCondition, prescription } = req.body;

    console.log('Request body:', req.body); // Debugging

    try {
        let result = await updateMedicalReportModel(username, medicalCondition, prescription);
        res.status(200).send({ message: "Medical report updated successfully", result: result });
    } catch (err) {
        console.error('Error updating medical report:', err.message);
        res.status(500).send({ error: 'Failed to update medical report' });
    }
};

module.exports = {
    updateMedicalReport
};
