const { getAllEnquiries, getEnquiryById } = require('../models/enquiryModel.js');

async function getEnquiries(req, res) {
  try {
    const enquiries = await getAllEnquiries();
    res.json(enquiries);
    console.log('Fetched successfully');
  } catch (error) {
    console.error('Error fetching enquiries from database:', error.message);
    res.status(500).json({ error: 'Failed to fetch enquiries' });
  }
}

async function getEnquiryByIdHandler(req, res) {
  try {
    const id = req.params.id;
    const enquiry = await getEnquiryById(id);
    res.json(enquiry);
    console.log('Fetched enquiry details successfully');
  } catch (error) {
    console.error('Error fetching enquiry details from database:', error.message);
    res.status(500).json({ error: 'Failed to fetch enquiry details' });
  }
}

module.exports = { getEnquiries, getEnquiryByIdHandler };
