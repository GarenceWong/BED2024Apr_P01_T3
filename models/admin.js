const sql = require('mssql');
const dbConfig = require('../dbConfig');

class Admin {
    constructor(id, email, password) {
        this.id = id;
        this.email = email;
        this.password = password;
    }

    static async getAdminByEmail(email) {
        try {
            const connection = await sql.connect(dbConfig);
            const sqlQuery = `SELECT * FROM Users WHERE email = @Email`;

            const request = connection.request();
            request.input("Email", sql.VarChar, email);
            const result = await request.query(sqlQuery);
            connection.close();

            if (result.recordset.length > 0) {
                const user = result.recordset[0];
                return new Login(user.email, user.password);
            }
            return null;
        } catch (err) {
            console.error("Error fetching user by email:", err);
            throw err;
        }
    }

    async validatePassword(password) {
        try {
            return await password === this.password;
        } catch (err) {
            console.error("Error validating password:", err);
            throw err;
        }
    }
}
