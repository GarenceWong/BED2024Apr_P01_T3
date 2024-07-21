/* User Table */
CREATE TABLE Users (
  id INT PRIMARY KEY IDENTITY(1,1),
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  number VARCHAR(255) NOT NULL
);

CREATE TABLE PersonalDetails (
    id INT IDENTITY(1,1) PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    fullName VARCHAR(100) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    governmentId VARCHAR(50) NOT NULL,
    dob DATE NOT NULL,
    nationality VARCHAR(50) NOT NULL,
    residence VARCHAR(50) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    medicalCondition VARCHAR(255),
    allergies VARCHAR(255)
);

CREATE TABLE Timeslots (
    id INT PRIMARY KEY IDENTITY(1,1),
    username VARCHAR(100),
    timeslotDate DATE,
    timeslotTime TIME,
    status VARCHAR(20) CHECK (status IN ('confirmed', 'unconfirmed'))
);

CREATE TABLE Verification(
    Id INT IDENTITY(1,1) PRIMARY KEY,
    UserName VARCHAR(100) NOT NULL,
    HousingType VARCHAR(50) NOT NULL,
    EmploymentStatus VARCHAR(50) NOT NULL,
    GrossMonthlyIncome VARCHAR(50) NOT NULL,
    NRIC VARCHAR(20) NOT NULL
);

CREATE TABLE Donations (
    Username NVARCHAR(100) NOT NULL,
    DonationDate DATE NOT NULL,
    MedicineName NVARCHAR(100) NOT NULL,
    Quantity INT NOT NULL
);


/* Admin Table */
CREATE TABLE Admin (
    id INT PRIMARY KEY IDENTITY,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);

INSERT INTO Admin(email, password)
VALUES
  ('admin@gmail.com', 'admin'),

CREATE TABLE Appointments (
    id INT PRIMARY KEY IDENTITY(1,1),
    name VARCHAR(100) NOT NULL,
    appointmentDate DATE NOT NULL,
    appointmentTime TIME NOT NULL,
    status VARCHAR(20) CHECK (status IN ('confirmed', 'unconfirmed'))
);

CREATE TABLE enquiries (
    id INT IDENTITY(1,1) PRIMARY KEY,
    username NVARCHAR(50),
    title NVARCHAR(100),
    content NVARCHAR(MAX),
    date DATE DEFAULT CAST(GETDATE() AS DATE)
);

/* Doctor Table */
CREATE TABLE DoctorLogin (
    username VARCHAR(50) PRIMARY KEY,
    password VARCHAR(255) NOT NULL
);

-- Insert the predefined username and password
INSERT INTO DoctorLogin (username, password)
VALUES ('docz@gmail.com', '123456');

/* MedicalReports Table */
CREATE TABLE MedicalReports (
    id INT PRIMARY KEY IDENTITY(1,1),
    username VARCHAR(255) NOT NULL,
    medicalCondition VARCHAR(255) NOT NULL,
    prescription TEXT,
    FOREIGN KEY (id) REFERENCES Timeslots(id)
); 


-- medicalform end

