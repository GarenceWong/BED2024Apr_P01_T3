require('dotenv').config();

const express = require('express');
const booksController = require('./controllers/booksController');
const authController = require('./controllers/authController');
const { verifyJWT, checkRole } = require('./middlewares/authMiddleware');
const validateBook = require('./middlewares/validateBook'); // Import validateBook middleware
const sql = require('mssql');
const bodyParser = require('body-parser');
const usersController = require('./controllers/usersController');


const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.path}`);
  console.log('Query params:', req.query);
  console.log('Body:', req.body);
  next();
});

// Test route to log query parameters
app.get('/test', (req, res) => {
  console.log('Query params in /test:', req.query);
  res.json({ query: req.query });
});

// User routes
app.post("/register", authController.registerUser);
app.post("/login", authController.loginUser);
app.post("/users", usersController.createUser);
app.get("/users", usersController.getAllUsers);
app.get("/users/:id", usersController.getUserById);
app.put("/users/:id", usersController.updateUser);
app.delete("/users/:id", usersController.deleteUser);
app.get('/users/search', usersController.searchUsers);

// Book routes
app.get("/books", verifyJWT, checkRole(["member", "librarian"]), booksController.getAllBooks);
app.get("/books/:id", verifyJWT, checkRole(["member", "librarian"]), booksController.getBookById);
app.post("/books", verifyJWT, checkRole(["librarian"]), validateBook, booksController.createBook);
app.put("/books/:id", verifyJWT, checkRole(["librarian"]), validateBook, booksController.updateBook);
app.delete("/books/:id", verifyJWT, checkRole(["librarian"]), booksController.deleteBook);

// Database connection setup
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: false, // Use true for Azure SQL Database
    enableArithAbort: true
  },
  port: parseInt(process.env.DB_PORT, 10),
  connectionTimeout: parseInt(process.env.DB_CONNECTION_TIMEOUT, 10)
};

// Start server and connect to database
app.listen(port, async () => {
  try {
    await sql.connect(dbConfig);
    console.log("Database connection established successfully");
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }

  console.log(`Server listening on port ${port}`);
});

// Gracefully close database connection on SIGINT
process.on("SIGINT", async () => {
  console.log("Server is gracefully shutting down");
  await sql.close();
  console.log("Database connection closed");
  process.exit(0);
});
