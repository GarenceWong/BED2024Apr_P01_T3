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

async function updateStatus(id) {
  try {
    let pool = await sql.connect(dbConfig);
    let result = await pool.request()
      .input('id', sql.Int, id)
      .query("UPDATE Verification SET status = 'approved' WHERE id = @id");
    
    // Return the number of rows affected
    return { rowsAffected: result.rowsAffected[0] };
  } catch (err) {
    throw new Error('Error updating record: ' + err.message);
  }
}

module.exports = { getAllVerification, getVerificationById, updateStatus };