module.exports = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  trustServerCertificate: true,
  options: {
    encrypt: false, // Use true if you are connecting to an Azure SQL database
    enableArithAbort: true,
    port: parseInt(process.env.DB_PORT, 10), // Default SQL Server port
    connectionTimeout: parseInt(process.env.DB_CONNECTION_TIMEOUT, 10), // Connection timeout in milliseconds
  },
};

