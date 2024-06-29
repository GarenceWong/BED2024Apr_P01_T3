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
            const sqlQuery = `SELECT * FROM Admin WHERE email = @Email`;

            const request = connection.request();
            request.input("Email", sql.VarChar, email);
            const result = await request.query(sqlQuery);

            connection.close();

            if (result.recordset.length > 0) {
                const adminData = result.recordset[0];
                return new Admin(adminData.id, adminData.email, adminData.password);
            }
            return null;
        } catch (err) {
            console.error("Error fetching admin by email:", err);
            throw err;
        }
    }

    async validatePassword(password) {
        try {
            return password === this.password; 
        } catch (err) {
            console.error("Error validating password:", err);
            throw err;
        }
    }
}

module.exports = Admin;