const sql = require('mssql');
const config = require('../dbConfig');

class User {
  constructor(id, username, email, role, passwordHash) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.role = role;
    this.passwordHash = passwordHash;
  }

  static async getUserByUsername(username) {
    try {
      let pool = await sql.connect(config);
      let result = await pool.request()
        .input('username', sql.VarChar, username)
        .query('SELECT * FROM Users WHERE username = @username');
      return result.recordset[0] ? new User(result.recordset[0].id, result.recordset[0].username, result.recordset[0].email, result.recordset[0].role, result.recordset[0].passwordHash) : null;
    } catch (err) {
      throw new Error('Error retrieving user: ' + err.message);
    } finally {
      sql.close();
    }
  }

  static async createUser(user) {
    try {
      let pool = await sql.connect(config);
      let result = await pool.request()
        .input('username', sql.VarChar, user.username)
        .input('email', sql.VarChar, user.email)
        .input('role', sql.VarChar, user.role)
        .input('passwordHash', sql.VarChar, user.passwordHash)
        .query('INSERT INTO Users (username, email, role, passwordHash) VALUES (@username, @email, @role, @passwordHash)');
      return result.rowsAffected[0] > 0;
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
      return result.recordset.map(row => new User(row.id, row.username, row.email, row.role, row.passwordHash));
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
      return result.recordset[0] ? new User(result.recordset[0].id, result.recordset[0].username, result.recordset[0].email, result.recordset[0].role, result.recordset[0].passwordHash) : null;
    } catch (err) {
      throw new Error('Error retrieving user: ' + err.message);
    } finally {
      sql.close();
    }
  }

  static async updateUser(id, userData) {
    try {
      let pool = await sql.connect(config);
      let result = await pool.request()
        .input('id', sql.Int, id)
        .input('username', sql.VarChar, userData.username)
        .input('email', sql.VarChar, userData.email)
        .input('role', sql.VarChar, userData.role)
        .input('passwordHash', sql.VarChar, userData.passwordHash)
        .query('UPDATE Users SET username = @username, email = @email, role = @role, passwordHash = @passwordHash WHERE id = @id');
      return result.rowsAffected[0] > 0 ? 'User updated successfully' : 'User not found';
    } catch (err) {
      throw new Error('Error updating user: ' + err.message);
    } finally {
      sql.close();
    }
  }

  static async deleteUser(id) {
    try {
      let pool = await sql.connect(config);
      let result = await pool.request()
        .input('id', sql.Int, id)
        .query('DELETE FROM Users WHERE id = @id');
      return result.rowsAffected[0] > 0 ? 'User deleted successfully' : 'User not found';
    } catch (err) {
      throw new Error('Error deleting user: ' + err.message);
    } finally {
      sql.close();
    }
  }

  static async searchUsers(searchTerm) {
    try {
      let pool = await sql.connect(config);
      let result = await pool.request()
        .input('searchTerm', sql.VarChar, `%${searchTerm}%`)
        .query('SELECT * FROM Users WHERE username LIKE @searchTerm OR email LIKE @searchTerm');
      return result.recordset.map(row => new User(row.id, row.username, row.email, row.role, row.passwordHash));
    } catch (err) {
      throw new Error('Error searching users: ' + err.message);
    } finally {
      sql.close();
    }
  }
}

module.exports = User;
