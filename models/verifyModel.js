const sql = require("mssql");
const dbConfig = require("../dbConfig");

async function getAllVerification() {
  let pool = await sql.connect(dbConfig);
  let result = await pool.request().query('SELECT UserName FROM verification');
  return result.recordset;
}

async function getVerificationById(Id) {
  let pool = await sql.connect(dbConfig);
  let result = await pool.request()
      .input('Id', sql.Int, Id)
      .query('SELECT * FROM Verification WHERE Id = @Id');
  return result.recordset[0];
}

module.exports = { getAllVerification, getVerificationById };