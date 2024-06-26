const express = require("express");
const sql = require("mssql");
const dbConfig = require("./dbConfig");
const { signup, login } = require("./controllers/usersController");
const { doctorLogin } = require("./controllers/doctorlogincontroller"); // Import doctorLogin function from doctorController

const app = express();
const port = process.env.PORT || 3003;

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.post("/signup", signup); // User signup route
app.post("/login", login); // User login route
app.post("/doctor/login", doctorLogin); // Doctor login route

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
