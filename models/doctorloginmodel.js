const sql = require("mssql");
const dbConfig = require("../dbConfig");

class Doctor {
    constructor(id, username, password) {
      this.id = id;
      this.username = username;
      this.password = password;
    }
  
    static async createDoctor(username, password) {
      const connection = await sql.connect(dbConfig);
  
      const sqlQuery = `
        INSERT INTO Doctors (username, password)
        OUTPUT INSERTED.id, INSERTED.username
        VALUES (@username, @password)
      `;
  
      const request = connection.request();
      request.input("username", sql.VarChar(50), username);
      request.input("password", sql.VarChar(255), password);
      const result = await request.query(sqlQuery);
  
      connection.close();
  
      return new Doctor(
        result.recordset[0].id,
        result.recordset[0].username,
        password // Assuming you want to return the hashed password as well
      );
    }
  
    static async getDoctorByUsername(username) {
      const connection = await sql.connect(dbConfig);
  
      const sqlQuery = `SELECT * FROM Doctors WHERE username = @username`;
  
      const request = connection.request();
      request.input("username", sql.VarChar(50), username);
      const result = await request.query(sqlQuery);
  
      connection.close();
  
      if (result.recordset.length === 0) {
        return null;
      }
  
      return new Doctor(
        result.recordset[0].id,
        result.recordset[0].username,
        result.recordset[0].password
      );
    }
  }
  
  module.exports = Doctor;