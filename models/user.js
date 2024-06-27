const sql = require("mssql");
const bcrypt = require("bcrypt");
const dbConfig = require("../dbConfig");
 
class User {
  constructor(id, username, email, password, number) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.number = number;
  }
 
  static async getUserByEmail(email) {
    try {
      const connection = await sql.connect(dbConfig);
 
      const sqlQuery = "SELECT * FROM Users WHERE email = @Email";
      const request = connection.request();
      request.input("Email", sql.VarChar, email);
      const result = await request.query(sqlQuery);
 
      connection.close();
 
      if (result.recordset.length > 0) {
        const user = result.recordset[0];
        return new User(user.id, user.username, user.email, user.password, user.number);
      }
 
      return null;
    } catch (err) {
      console.error("Error getting user by email:", err);
      throw err;
    }
  }
 
  static async createUser(username, email, password, number) {
    try {
      const connection = await sql.connect(dbConfig);
 
      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);
 
      const sqlQuery = `
        INSERT INTO Users (username, email, password, number)
        OUTPUT INSERTED.id, INSERTED.username, INSERTED.email, INSERTED.password, INSERTED.number
        VALUES (@Username, @Email, @Password, @Number)
      `;
 
      const request = connection.request();
      request.input("Username", sql.VarChar, username);
      request.input("Email", sql.VarChar, email);
      request.input("Password", sql.VarChar, hashedPassword);
      request.input("Number", sql.VarChar, number);
      const result = await request.query(sqlQuery);
 
      connection.close();
 
      if (result.recordset.length > 0) {
        const user = result.recordset[0];
        return new User(user.id, user.username, user.email, user.password, user.number);
      }
 
      return null;
    } catch (err) {
      console.error("Error creating user:", err);
      throw err;
    }
  }
}
 
module.exports = User;





