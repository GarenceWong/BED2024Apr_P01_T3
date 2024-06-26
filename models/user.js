const sql = require("mssql");
const dbConfig = require("../dbConfig");

class User {
    constructor(id, username, email, password, number) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.number = number;
    }

    static async createUser(username, email, password, number) {
        const connection = await sql.connect(dbConfig);

        const sqlQuery = `
            INSERT INTO Users (username, email, password, number)
            OUTPUT INSERTED.id, INSERTED.username, INSERTED.email, INSERTED.password, INSERTED.number
            VALUES (@username, @Email, @Password, @Number)
        `;

        const request = connection.request();
        request.input("username", sql.VarChar, username);
        request.input("email", sql.VarChar, email);
        request.input("password", sql.VarChar, password);
        request.input("number", sql.VarChar, number);
        const result = await request.query(sqlQuery);

        connection.close();

        return new User(
            result.recordset[0].id,
            result.recordset[0].username,
            result.recordset[0].email,
            result.recordset[0].password,
            result.recordset[0].number
        );
    }

    static async getUserByEmail(email) {
        const connection = await sql.connect(dbConfig);

        const sqlQuery = `SELECT * FROM Users WHERE email = @Email`;

        const request = connection.request();
        request.input("email", sql.VarChar, email);
        const result = await request.query(sqlQuery);

        connection.close();

        return result.recordset[0]
            ? new User(
                result.recordset[0].id,
                result.recordset[0].username,
                result.recordset[0].email,
                result.recordset[0].password,
                result.recordset[0].number
            )
            : null;
    }
}

module.exports = User;





