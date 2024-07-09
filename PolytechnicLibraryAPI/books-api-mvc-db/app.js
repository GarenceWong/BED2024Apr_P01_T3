const express = require("express");
const booksController = require("./controllers/booksController");
const usersController = require("./controllers/usersController");
const sql = require("mssql");
const dbConfig = require("./dbConfig");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function validateBook(req, res, next) {
  const { title, author } = req.body;
  if (!title || !author) {
    res.status(400).send('Missing book title or author');
    return;
  }
  next();
}

// Middleware to log the incoming request details
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

// Routes for users
app.post("/users", usersController.createUser);
app.get("/users", usersController.getAllUsers);
app.get("/users/:id", usersController.getUserById);
app.put("/users/:id", usersController.updateUser);
app.delete("/users/:id", usersController.deleteUser);
app.get('/users/search', usersController.searchUsers);

// Routes for books
app.get("/books", booksController.getAllBooks);
app.get("/books/:id", booksController.getBookById);
app.post("/books", validateBook, booksController.createBook);
app.put("/books/:id", validateBook, booksController.updateBook);
app.delete("/books/:id", booksController.deleteBook);

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

process.on("SIGINT", async () => {
  console.log("Server is gracefully shutting down");
  await sql.close();
  console.log("Database connection closed");
  process.exit(0);
});




