const { getAllMedicines } = require("../models/medicinemodel");

async function fetchAllMedicines(req, res) {
    try {
        const medicines = await getAllMedicines();
        res.json(medicines);
    } catch (error) {
        console.error('Error fetching medicines:', error.message);
        res.status(500).json({ error: 'Failed to fetch medicines' });
    }
}

module.exports = {
    fetchAllMedicines
};
