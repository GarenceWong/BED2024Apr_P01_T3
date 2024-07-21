const medicalReportModel = require('../models/medicalReportModel');

async function getMedicalReport(req, res) {
    const username = req.query.username;
    if (!username) {
        return res.status(400).send({ error: 'Username is required' });
    }

    try {
        const report = await medicalReportModel.getMedicalReportByUsername(username);
        res.status(200).send(report);
    } catch (err) {
        res.status(500).send({ error: 'Error fetching medical report' });
    }
}

module.exports = {
    getMedicalReport
};
