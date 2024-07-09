const sql = require('mssql');
const config = require('../dbConfig');

class User {
  constructor(id, username, email) {
    this.id = id;
    this.username = username;
    this.email = email;
  }

  static async createUser(user) {
    try {
      let pool = await sql.connect(config);
      let result = await pool.request()
        .input('username', sql.VarChar, user.username)
        .input('email', sql.VarChar, user.email)
        .query('INSERT INTO Users (username, email) VALUES (@username, @Email); SELECT * FROM Users WHERE id = SCOPE_IDENTITY();');
      return result.recordset[0];
    } catch (err) {
      throw new Error('Error creating user: ' + err.message);
    } finally {
      sql.close();
    }
  }

  static async getAllUsers() {
    try {
      let pool = await sql.connect(config);
      let result = await pool.request().query('SELECT * FROM Users');
      return result.recordset;
    } catch (err) {
      throw new Error('Error retrieving users: ' + err.message);
    } finally {
      sql.close();
    }
  }

  static async getUserById(id) {
    try {
      let pool = await sql.connect(config);
      let result = await pool.request()
        .input('id', sql.Int, id)
        .query('SELECT * FROM Users WHERE id = @id');
      return result.recordset[0] || null;
    } catch (err) {
      throw new Error('Error retrieving user: ' + err.message);
    } finally {
      sql.close();
    }
  }

  static async updateUser(id, updatedUser) {
    try {
      let pool = await sql.connect(config);
      await pool.request()
        .input('id', sql.Int, id)
        .input('username', sql.VarChar, updatedUser.username)
        .input('email', sql.VarChar, updatedUser.email)
        .query('UPDATE Users SET username = @username, email = @Email WHERE id = @id');
      return { message: 'User updated successfully' };
    } catch (err) {
      throw new Error('Error updating user: ' + err.message);
    } finally {
      sql.close();
    }
  }

  static async deleteUser(id) {
    try {
      let pool = await sql.connect(config);
      await pool.request()
        .input('id', sql.Int, id)
        .query('DELETE FROM Users WHERE id = @id');
      return { message: 'User deleted successfully' };
    } catch (err) {
      throw new Error('Error deleting user: ' + err.message);
    } finally {
      sql.close();
    }
  }

  static async searchUsers(searchTerm) {
    try {
      let pool = await sql.connect(config);
      let query = `
        SELECT *
        FROM Users
        WHERE username LIKE '%' + @searchTerm + '%'
          OR email LIKE '%' + @searchTerm + '%'
      `;
      let result = await pool.request()
        .input('searchTerm', sql.VarChar, searchTerm)
        .query(query);
      return result.recordset;
    } catch (error) {
      throw new Error('Error searching users: ' + error.message);
    } finally {
      sql.close();
    }
  }
}

module.exports = User;








  