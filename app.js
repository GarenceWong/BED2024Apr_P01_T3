const express = require("express");
const sql = require("mssql");
const dbConfig = require("./dbConfig");
const { signup, login } = require("./controllers/usersController");

const app = express();
const port = process.env.PORT || 3003;

// Middleware to parse JSON bodies
app.use(express.json());

// Signup route
app.post("/signup", signup);

// Login route (to be implemented in usersController.js)
app.post("/login", login);

// Start the server
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

// Gracefully shut down
process.on("SIGINT", async () => {
  console.log("Server is gracefully shutting down");
  await sql.close();
  console.log("Database connection closed");
  process.exit(0);
});

