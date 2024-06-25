const sql = require("mssql");
const dbConfig = require("../dbConfig");

class Login {
  constructor(id, userId, loginTime) {
    this.id = id;
    this.userId = userId;
    this.loginTime = loginTime;
  }

  static async createLogin(userId) {
    const connection = await sql.connect(dbConfig);

    const sqlQuery = `
      INSERT INTO Logins (userId)
      OUTPUT INSERTED.id, INSERTED.userId, INSERTED.loginTime
      VALUES (@userId)
    `;

    const request = connection.request();
    request.input("userId", sql.Int, userId);
    const result = await request.query(sqlQuery);

    connection.close();

    return new Login(
      result.recordset[0].id,
      result.recordset[0].userId,
      result.recordset[0].loginTime
    );
  }

  static async getLoginsByUserId(userId) {
    const connection = await sql.connect(dbConfig);

    const sqlQuery = `SELECT * FROM Logins WHERE userId = @userId`;

    const request = connection.request();
    request.input("userId", sql.Int, userId);
    const result = await request.query(sqlQuery);

    connection.close();

    return result.recordset.map(row => new Login(row.id, row.userId, row.loginTime));
  }
}

module.exports = Login;
