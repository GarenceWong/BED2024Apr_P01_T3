const { getAllMedicines, updateMedicineStock } = require("../models/medicinemodel");

async function fetchAllMedicines(req, res) {
    try {
        const medicines = await getAllMedicines();
        res.json(medicines);
    } catch (error) {
        console.error('Error fetching medicines:', error.message);
        res.status(500).json({ error: 'Failed to fetch medicines' });
    }
}

async function handleUpdateMedicine(req, res) {
    const { id, stock } = req.body;

    try {
        const affectedRows = await updateMedicineStock(id, stock);
        if (affectedRows > 0) {
            res.json({ message: 'Stock updated successfully' });
        } else {
            res.status(404).json({ message: 'Medicine not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    fetchAllMedicines,
    handleUpdateMedicine 
};
