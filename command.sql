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
    NRIC VARCHAR(20) NOT NULL,
    Status VARCHAR(20) DEFAULT 'pending' CHECK (Status IN ('pending', 'approved'))
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


-- medicine table
CREATE TABLE medicine (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    availability INT NOT NULL
);
INSERT INTO medicine (id, name, availability) VALUES
(1, 'Acetaminophen', 0),
(2, 'Ibuprofen', 0),
(3, 'Naproxen', 0),
(4, 'Aspirin', 0),
(5, 'Celecoxib', 0),
(6, 'Diclofenac', 0),
(7, 'Indomethacin', 0),
(8, 'Amoxicillin', 0),
(9, 'Azithromycin', 0),
(10, 'Ciprofloxacin', 0),
(11, 'Doxycycline', 0),
(12, 'Erythromycin', 0),
(13, 'Levofloxacin', 0),
(14, 'Penicillin', 0),
(15, 'Sulfamethoxazole/Trimethoprim', 0),
(16, 'Fluoxetine', 0),
(17, 'Sertraline', 0),
(18, 'Citalopram', 0),
(19, 'Escitalopram', 0),
(20, 'Venlafaxine', 0),
(21, 'Duloxetine', 0),
(22, 'Bupropion', 0),
(23, 'Diphenhydramine', 0),
(24, 'Loratadine', 0),
(25, 'Cetirizine', 0),
(26, 'Fexofenadine', 0),
(27, 'Desloratadine', 0),
(28, 'Chlorpheniramine', 0),
(29, 'Ranitidine', 0),
(30, 'Omeprazole', 0),
(31, 'Esomeprazole', 0),
(32, 'Lansoprazole', 0),
(33, 'Famotidine', 0);


