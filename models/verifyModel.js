const sql = require("mssql");
const dbConfig = require("../dbConfig");

async function getAllVerification() {
  let pool = await sql.connect(dbConfig);
  let result = await pool.request().query('SELECT * FROM verification');
  return result.recordset;
}

async function getVerificationById(id) {
  let pool = await sql.connect(dbConfig);
  let result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM Verification WHERE id = @id');
  return result.recordset[0];
}

module.exports = { getAllVerification, getVerificationById };