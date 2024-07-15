const booksController = require('../controllers/booksController');
const Book = require('../models/book');

jest.mock('../models/Book');

describe('booksController.getAllBooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch all books and return a JSON response', async () => {
    const mockBooks = [
      { id: 1, title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', availability: 'Y' },
      { id: 2, title: 'The Hitchhiker\'s Guide to the Galaxy', author: 'Douglas Adams', availability: 'N' }
    ];

    Book.getAllBooks.mockResolvedValue(mockBooks);

    const req = {};
    const res = { json: jest.fn() };

    await booksController.getAllBooks(req, res);

    expect(Book.getAllBooks).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(mockBooks);
  });

  it('should handle errors and return a 500 status with error message', async () => {
    const errorMessage = 'Database error';
    Book.getAllBooks.mockRejectedValue(new Error(errorMessage));

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await booksController.getAllBooks(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Error retrieving books');
  });
});
