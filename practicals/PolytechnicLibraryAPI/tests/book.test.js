const Book = require('../models/book');
const sql = require('mssql');

jest.mock('mssql');

describe('Book.getAllBooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should retrieve all books from the database', async () => {
    const mockBooks = [
      { book_id: 1, title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', availability: 'Y' },
      { book_id: 2, title: 'The Hitchhiker\'s Guide to the Galaxy', author: 'Douglas Adams', availability: 'N' }
    ];

    const mockRequest = {
      query: jest.fn().mockResolvedValue({ recordset: mockBooks })
    };
    const mockConnection = {
      request: jest.fn().mockReturnValue(mockRequest),
      close: jest.fn().mockResolvedValue(undefined)
    };

    sql.connect.mockResolvedValue(mockConnection);

    const books = await Book.getAllBooks();

    expect(sql.connect).toHaveBeenCalledWith(expect.any(Object));
    expect(mockConnection.close).toHaveBeenCalledTimes(1);
    expect(books).toHaveLength(2);
    expect(books[0]).toEqual(expect.objectContaining({
      id: 1,
      title: 'The Lord of the Rings',
      author: 'J.R.R. Tolkien',
      availability: 'Y'
    }));
    expect(books[1]).toEqual(expect.objectContaining({
      id: 2,
      title: 'The Hitchhiker\'s Guide to the Galaxy',
      author: 'Douglas Adams',
      availability: 'N'
    }));
  });

  it('should handle errors when retrieving books', async () => {
    const errorMessage = 'Database Error';
    sql.connect.mockRejectedValue(new Error(errorMessage));

    await expect(Book.getAllBooks()).rejects.toThrow(errorMessage);
  });
});

describe('Book.updateBookAvailability', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update the availability of a book', async () => {
    const mockRequest = {
      input: jest.fn().mockReturnThis(),
      query: jest.fn().mockResolvedValue({ rowsAffected: [1] })
    };
    const mockConnection = {
      request: jest.fn().mockReturnValue(mockRequest),
      close: jest.fn().mockResolvedValue(undefined)
    };

    sql.connect.mockResolvedValue(mockConnection);

    const result = await Book.updateBookAvailability(1, 'N');

    expect(sql.connect).toHaveBeenCalledWith(expect.any(Object));
    expect(mockRequest.input).toHaveBeenCalledWith('availability', 'N');
    expect(mockRequest.input).toHaveBeenCalledWith('book_id', 1);
    expect(mockRequest.query).toHaveBeenCalledWith('UPDATE Books SET availability = @availability WHERE book_id = @book_id');
    expect(mockConnection.close).toHaveBeenCalledTimes(1);
    expect(result).toBe(true);
  });

  it('should return false if the book with the given id does not exist', async () => {
    const mockRequest = {
      input: jest.fn().mockReturnThis(),
      query: jest.fn().mockResolvedValue({ rowsAffected: [0] })
    };
    const mockConnection = {
      request: jest.fn().mockReturnValue(mockRequest),
      close: jest.fn().mockResolvedValue(undefined)
    };

    sql.connect.mockResolvedValue(mockConnection);

    const result = await Book.updateBookAvailability(99, 'N');

    expect(sql.connect).toHaveBeenCalledWith(expect.any(Object));
    expect(mockRequest.input).toHaveBeenCalledWith('availability', 'N');
    expect(mockRequest.input).toHaveBeenCalledWith('book_id', 99);
    expect(mockRequest.query).toHaveBeenCalledWith('UPDATE Books SET availability = @availability WHERE book_id = @book_id');
    expect(mockConnection.close).toHaveBeenCalledTimes(1);
    expect(result).toBe(false);
  });

  it('should handle errors when updating book availability', async () => {
    const errorMessage = 'Database Error';
    sql.connect.mockRejectedValue(new Error(errorMessage));

    await expect(Book.updateBookAvailability(1, 'N')).rejects.toThrow(errorMessage);
  });
});
