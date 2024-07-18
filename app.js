const express = require("express");
const cors = require("cors");
const fileUpload = require('express-fileupload'); 
const sql = require("mssql");
const dbConfig = require("./dbConfig");
const { signup } = require("./controllers/usersController");
const { doctorLogin } = require("./controllers/doctorlogincontroller");
const { login } = require('./controllers/loginController');
const { adminLogin } = require('./controllers/admincontroller');
const { addPersonalDetails, fetchPersonalDetails } = require('./controllers/personalDetailController');
const { createTimeslot, getTimeslots } = require('./controllers/timeslotController');
const { handleDeleteAppointment, handleUpdateAppointment, getUserAppointment } = require('./controllers/userAppointmentController');
const { submitVerificationDetails, verifyUserHandler, checkVerificationStatus } = require('./controllers/verificationController');

const app = express();
const port = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.post("/signup", signup);
app.post("/login", login);
app.post("/doctor/login", doctorLogin);
app.post("/admin/login", adminLogin);
app.post('/personal-details', addPersonalDetails);
app.get('/personal-details/:id', fetchPersonalDetails);
app.post('/new-timeslot', createTimeslot);
app.get('/get-timeslots', getTimeslots);
app.delete('/delete-appointment/:id', handleDeleteAppointment);
app.put('/update-appointment', handleUpdateAppointment);
app.get('/get-appointment/:id', getUserAppointment);
app.post('/submit-verification', submitVerificationDetails);
app.post('/verify-user', verifyUserHandler);
app.get('/verification-status/:verificationID', checkVerificationStatus);

app.post('/new-appointment', async (req, res) => {
  try {
      const { patientName, appointmentDate, appointmentTime, status } = req.body;

      console.log('Received data:', { patientName, appointmentDate, appointmentTime, status });

      let pool = await sql.connect(dbConfig);
      let result = await pool.request()
          .input('name', sql.VarChar(100), patientName)
          .input('appointmentDate', sql.Date, appointmentDate)
          .input('appointmentTime', sql.Time, new Date('2000-01-01T' + appointmentTime)) // Assuming appointmentTime is in HH:mm:ss format
          .input('status', sql.VarChar(20), status)
          .query('INSERT INTO Appointments (name, appointmentDate, appointmentTime, status) VALUES (@name, @appointmentDate, @appointmentTime, @status)');

      console.log('Appointment added successfully:', result);
      res.status(200).send('Appointment added successfully.');
  } catch (err) {
      console.error('Error adding new appointment:', err.message);
      res.status(500).send('Error adding new appointment. Please try again later.');
  }
});

async function fetchAppointmentsFromDatabase() {
  try {
      let pool = await sql.connect(dbConfig);
      let result = await pool.request().query('SELECT * FROM Appointments');
      return result.recordset;
  } catch (error) {
      console.error('Error fetching appointments from database:', error.message);
      throw error;
  }
}
app.get('/get-appointments', async (req, res) => {
  try {
      const appointments = await fetchAppointmentsFromDatabase();
      res.json(appointments);
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

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