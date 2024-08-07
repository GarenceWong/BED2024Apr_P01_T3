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
    id INT PRIMARY KEY IDENTITY(1,1),
    name VARCHAR(255) NOT NULL,
    stock INT NOT NULL
);

INSERT INTO medicine (name, stock) VALUES
('Paracetamol', 0),   -- Acetaminophen
('Ibuprofen', 0),     -- Ibuprofen
('Naproxen', 0),      -- Naproxen
('Aspirin', 0),       -- Aspirin
('Celebrex', 0),      -- Celecoxib
('Voltaren', 0),      -- Diclofenac
('Indocin', 0),       -- Indomethacin
('Amoxil', 0),        -- Amoxicillin
('Zithromax', 0),     -- Azithromycin
('Cipro', 0),         -- Ciprofloxacin
('Doxycycline', 0),   -- Doxycycline
('Erythrocin', 0),    -- Erythromycin
('Levaquin', 0),      -- Levofloxacin
('Penicillin', 0),    -- Penicillin
('Bactrim', 0),       -- Sulfamethoxazole/Trimethoprim
('Prozac', 0),        -- Fluoxetine
('Zoloft', 0),        -- Sertraline
('Celexa', 0),        -- Citalopram
('Lexapro', 0),       -- Escitalopram
('Effexor', 0),       -- Venlafaxine
('Cymbalta', 0),      -- Duloxetine
('Wellbutrin', 0),    -- Bupropion
('Benadryl', 0),      -- Diphenhydramine
('Claritin', 0),      -- Loratadine
('Zyrtec', 0),        -- Cetirizine
('Allegra', 0),       -- Fexofenadine
('Clarinex', 0),      -- Desloratadine
('Chlor-Trimeton', 0),-- Chlorpheniramine
('Zantac', 0),        -- Ranitidine
('Prilosec', 0),      -- Omeprazole
('Nexium', 0),        -- Esomeprazole
('Prevacid', 0),      -- Lansoprazole
('Pepcid', 0);        -- Famotidine


