const express = require("express");
const cors = require("cors");
const sql = require("mssql");
const dbConfig = require("./dbConfig");
const { signup } = require("./controllers/usersController");
const { doctorLogin } = require("./controllers/doctorlogincontroller");
const { login } = require('./controllers/loginController');
 
const app = express();
const port = process.env.PORT || 3003;
 
app.use(cors());
app.use(express.json());
 
app.post("/signup", signup);
app.post("/login", login);
app.post("/doctor/login", doctorLogin);
 
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
