module.exports = {
    user: "healthcare-api",
    password: "123",
    server: "localhost",
    database: "healthcare_db",
    trustServerCertificate: true,
    options: {
      port: 1433,
      connectionTimeout: 60000,
      encrypt: true,
      enableArithAbort: true
    },
  };