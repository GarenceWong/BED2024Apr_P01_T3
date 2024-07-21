const sql = require("mssql");
const dbConfig = require("../dbConfig");

class Verification {
  constructor(id, userName, housingType, employmentStatus, grossMonthlyIncome, nric) {
    this.id = id;
    this.userName = userName;
    this.housingType = housingType;
    this.employmentStatus = employmentStatus;
    this.grossMonthlyIncome = grossMonthlyIncome;
    this.nric = nric;
  }

  static async createVerification(userName, housingType, employmentStatus, grossMonthlyIncome, nric) {
    try {
      const connection = await sql.connect(dbConfig);

      const sqlQuery = `
        INSERT INTO Verification (UserName, HousingType, EmploymentStatus, GrossMonthlyIncome, NRIC)
        OUTPUT INSERTED.Id, INSERTED.UserName, INSERTED.HousingType, INSERTED.EmploymentStatus, INSERTED.GrossMonthlyIncome, INSERTED.NRIC
        VALUES (@UserName, @HousingType, @EmploymentStatus, @GrossMonthlyIncome, @NRIC)
      `;

      const request = connection.request();
      request.input("UserName", sql.VarChar, userName);
      request.input("HousingType", sql.VarChar, housingType);
      request.input("EmploymentStatus", sql.VarChar, employmentStatus);
      request.input("GrossMonthlyIncome", sql.VarChar, grossMonthlyIncome);
      request.input("NRIC", sql.VarChar, nric);
      const result = await request.query(sqlQuery);

      connection.close();

      if (result.recordset.length > 0) {
        const verification = result.recordset[0];
        return new Verification(
          verification.Id,
          verification.UserName,
          verification.HousingType,
          verification.EmploymentStatus,
          verification.GrossMonthlyIncome,
          verification.NRIC
        );
      }

      return null;
    } catch (err) {
      console.error("Error creating verification:", err);
      throw err;
    }
  }
}

module.exports = Verification;









