const sql = require("mssql");
const dbConfig = require("../dbConfig");

async function getAllVerification() {
  let pool = await sql.connect(dbConfig);
  let result = await pool.request().query('SELECT UserName FROM verification');
  return result.recordset;
}

module.exports = { getAllVerification };