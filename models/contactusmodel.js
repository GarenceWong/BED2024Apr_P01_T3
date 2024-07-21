// models/contactusmodel.js
const sql = require('mssql');
const dbConfig = require('../dbConfig');

const addEnquiry = async (username, title, content) => {
    try {
        let pool = await sql.connect(dbConfig);
        await pool.request()
            .input('username', sql.NVarChar(50), username)
            .input('title', sql.NVarChar(100), title)
            .input('content', sql.NVarChar(sql.MAX), content)
            .query('INSERT INTO enquiries (username, title, content) VALUES (@username, @title, @content)');
        return { success: true, message: 'Enquiry added successfully.' };
    } catch (error) {
        console.error('Error adding enquiry:', error.message);
        return { success: false, message: 'Error adding enquiry. Please try again later.' };
    }
};

module.exports = { addEnquiry };
