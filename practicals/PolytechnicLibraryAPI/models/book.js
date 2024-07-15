const sql = require('mssql');
const dbConfig = require('../dbConfig');

class Book {
  constructor({ book_id, title, author, availability }) {
    this.id = book_id;
    this.title = title;
    this.author = author;
    this.availability = availability;
  }

  static async getAllBooks() {
    try {
      const pool = await sql.connect(dbConfig);
      const result = await pool.request().query('SELECT * FROM Books');
      pool.close();
      return result.recordset.map(record => new Book(record));
    } catch (err) {
      throw new Error(err.message);
    }
  }

  static async updateBookAvailability(book_id, availability) {
    try {
      const pool = await sql.connect(dbConfig);
      const result = await pool.request()
        .input('availability', sql.Char, availability)
        .input('book_id', sql.Int, book_id)
        .query('UPDATE Books SET availability = @availability WHERE book_id = @book_id');
      pool.close();
      return result.rowsAffected[0] > 0;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

module.exports = Book;
