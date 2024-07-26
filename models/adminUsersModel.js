const sql = require("mssql");
const dbConfig = require("../dbConfig");

async function getAllUsers() {
  let pool = await sql.connect(dbConfig);
  let result = await pool.request().query('SELECT id,username,email,number FROM users');
  return result.recordset;
}

async function createUserInDb(username, email, password, number) {
  let pool = await sql.connect(dbConfig);
  try {
    await pool.request()
      .input('username', sql.VarChar, username)
      .input('email', sql.VarChar, email)
      .input('password', sql.VarChar, password)
      .input('number', sql.VarChar, number)
      .query('INSERT INTO Users (username, email, password, number) VALUES (@username, @email, @password, @number)');
  } catch (error) {
    throw new Error('Error creating user in database: ' + error.message);
  }
}


module.exports = { getAllUsers, createUserInDb };
