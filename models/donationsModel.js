const sql = require("mssql");
const dbConfig = require("../dbConfig");

async function getAllDonations() {
  let pool = await sql.connect(dbConfig);
  let result = await pool.request().query('SELECT Username, CONVERT(varchar, DonationDate, 23) as DonationDate, MedicineName, Quantity FROM donations');
  return result.recordset;
}

module.exports = { getAllDonations };