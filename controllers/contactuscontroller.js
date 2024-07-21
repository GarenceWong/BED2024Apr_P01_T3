// controllers/contactuscontroller.js
const { addEnquiry } = require('../models/contactusmodel');

const submitEnquiry = async (req, res) => {
    const { username, title, content } = req.body;

    if (!username || !title || !content) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const result = await addEnquiry(username, title, content);
        if (result.success) {
            res.status(200).json({ message: result.message });
        } else {
            res.status(500).json({ error: result.message });
        }
    } catch (error) {
        console.error('Error in submitEnquiry:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { submitEnquiry };
