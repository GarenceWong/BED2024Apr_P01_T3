const sql = require("mssql");
const dbConfig = require("../dbConfig");

async function getAllDonations() {
  let pool = await sql.connect(dbConfig);
  let result = await pool.request().query('SELECT Id, Username, CONVERT(varchar, DonationDate, 23) as DonationDate, MedicineName, Quantity FROM donations');
  return result.recordset;
}

async function deleteDonationById(id) {
    let pool = await sql.connect(dbConfig);
  
    // Ensure 'id' is being passed correctly to the SQL query
    await pool.request()
      .input('Id', sql.Int, id) // Use sql.Int for integer type
      .query('DELETE FROM donations WHERE Id = @Id');
  }

module.exports = { getAllDonations, deleteDonationById };
