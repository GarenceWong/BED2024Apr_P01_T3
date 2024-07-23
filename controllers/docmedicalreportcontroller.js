const { getMedicalReports } = require('../models/docmedicalreportmodel');

const fetchAllMedicalReports = async (req, res) => {
    try {
        const reports = await getMedicalReports();
        res.status(200).json(reports);
    } catch (err) {
        console.error("Error in fetching medical reports:", err.message);
        res.status(500).json({ error: 'Failed to fetch medical reports' });
    }
};

module.exports = { fetchAllMedicalReports };
