const sql = require("mssql");
const dbConfig = require("../dbConfig");

async function getAllEnquiries() {
  let pool = await sql.connect(dbConfig);
  let result = await pool.request().query('SELECT id, username, title, CONVERT(varchar, date, 23) as date FROM enquiries');
  return result.recordset;
}

async function getEnquiryById(id) {
  let pool = await sql.connect(dbConfig);
  let result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT username, title, content FROM enquiries WHERE id = @id');
  return result.recordset[0];
}

module.exports = { getAllEnquiries, getEnquiryById };
