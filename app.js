const express = require("express");
const cors = require("cors");
const sql = require("mssql");
const dbConfig = require("./dbConfig");
const { signup } = require("./controllers/usersController");
const { doctorLogin } = require("./controllers/doctorlogincontroller");
const { login } = require('./controllers/loginController');
const { adminLogin } = require('./controllers/admincontroller');
const { addPersonalDetails, fetchPersonalDetails } = require('./controllers/personalDetailController');
const { createTimeslot } = require('./controllers/timeslotController');
const { getTimeslots, updateTimeslotStatus } = require('./controllers/doctorhomepagecontroller'); // (zehao - )
const { handleDeleteAppointment, handleUpdateAppointment, getUserAppointment } = require('./controllers/userAppointmentController');
const { submitVerificationDetails } = require('./controllers/verificationController');
const { submitMedicalReport } = require('./controllers/doctorappointmentcontroller');
const { getEnquiries, getEnquiryByIdHandler } = require('./controllers/enquiryController');
const { handleAddDonation } = require('./controllers/userdonationController');
const { submitEnquiry } = require('./controllers/contactuscontroller');
const { getDonations, deleteDonation } = require('./controllers/donationsController');
/*const { getDonations } = require('./controllers/donationsContoller.js')*/
const { getMedicalReport } = require('./controllers/medicalReportController'); // Import the medical report controller

const app = express();
const port = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Ensure URL-encoded data is parsed

// Define routes
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
app.post('/add-donation', handleAddDonation);
app.post('/submit-medical-report', submitMedicalReport);
app.get('/get-enquiries', getEnquiries);
app.get('/get-enquiry/:id', getEnquiryByIdHandler);
app.post('/submit-verification', submitVerificationDetails);
app.post('/submit-enquiry', submitEnquiry);
app.get('/get-donations', getDonations);
app.delete('/delete-donation/:id', deleteDonation);
app.get('/get-medical-report', getMedicalReport);

// Additional routes for appointments
app.post('/new-appointment', async (req, res) => {
    try {
        const { patientName, appointmentDate, appointmentTime, status } = req.body;

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

app.get('/get-appointments', async (req, res) => {
    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request().query('SELECT * FROM Appointments');
        res.json(result.recordset);
    } catch (error) {
        console.error('Error fetching appointments from database:', error.message);
        res.status(500).json({ error: 'Failed to fetch appointments' });
    }
});


// Start server
const server = app.listen(port, async () => {
    try {
        await sql.connect(dbConfig);
        console.log("Database connection established successfully");
    } catch (err) {
        console.error("Database connection error:", err.message);
        process.exit(1);
    }

    console.log(`Server listening on port ${port}`);
});

// Graceful shutdown
process.on("SIGINT", async () => {
    console.log("Server is gracefully shutting down");
    try {
        await server.close();
        await sql.close();
        console.log("Database connection closed");
        process.exit(0);
    } catch (err) {
        console.error("Error during shutdown:", err.message);
        process.exit(1);
    }
});
