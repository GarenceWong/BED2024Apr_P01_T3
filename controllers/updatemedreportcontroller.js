const { updateMedicalReportModel } = require('../models/updatemedreportmodel');

// Function to update a specific medical report
const updateMedicalReport = async (req, res) => {
    const { id, username, medicalCondition, prescription } = req.body;

    try {
        let result = await updateMedicalReportModel(id, username, medicalCondition, prescription);
        res.status(200).send({ message: "Medical report updated successfully", result: result });
    } catch (err) {
        console.error('Error updating medical report:', err.message);
        res.status(500).send({ error: 'Failed to update medical report' });
    }
};

module.exports = {
    updateMedicalReport
};
