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