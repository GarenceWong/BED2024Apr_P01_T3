const sql = require("mssql");
const dbConfig = require("../dbConfig");

class PersonalDetails {
  constructor(id, firstName, lastName, fullName, gender, governmentId, dob, nationality, residence, phone, email, address, medicalCondition, allergies) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.fullName = fullName;
    this.gender = gender;
    this.governmentId = governmentId;
    this.dob = dob;
    this.nationality = nationality;
    this.residence = residence;
    this.phone = phone;
    this.email = email;
    this.address = address;
    this.medicalCondition = medicalCondition;
    this.allergies = allergies;
  }

  static async getPersonalDetailsById(id) {
    try {
      const connection = await sql.connect(dbConfig);
      const sqlQuery = "SELECT * FROM PersonalDetails WHERE id = @Id";
      const request = connection.request();
      request.input("Id", sql.Int, id);
      const result = await request.query(sqlQuery);
      connection.close();

      if (result.recordset.length > 0) {
        const details = result.recordset[0];
        return new PersonalDetails(
          details.id,
          details.firstName,
          details.lastName,
          details.fullName,
          details.gender,
          details.governmentId,
          details.dob,
          details.nationality,
          details.residence,
          details.phone,
          details.email,
          details.address,
          details.medicalCondition,
          details.allergies
        );
      }

      return null;
    } catch (err) {
      console.error("Error getting personal details by id:", err);
      throw err;
    }
  }

  static async createPersonalDetails(details) {
    try {
      const connection = await sql.connect(dbConfig);
      const sqlQuery = `
        INSERT INTO PersonalDetails (firstName, lastName, fullName, gender, governmentId, dob, nationality, residence, phone, email, address, medicalCondition, allergies)
        OUTPUT INSERTED.id, INSERTED.firstName, INSERTED.lastName, INSERTED.fullName, INSERTED.gender, INSERTED.governmentId, INSERTED.dob, INSERTED.nationality, INSERTED.residence, INSERTED.phone, INSERTED.email, INSERTED.address, INSERTED.medicalCondition, INSERTED.allergies
        VALUES (@FirstName, @LastName, @FullName, @Gender, @GovernmentId, @Dob, @Nationality, @Residence, @Phone, @Email, @Address, @MedicalCondition, @Allergies)
      `;
      const request = connection.request();
      request.input("FirstName", sql.VarChar, details.firstName);
      request.input("LastName", sql.VarChar, details.lastName);
      request.input("FullName", sql.VarChar, details.fullName);
      request.input("Gender", sql.VarChar, details.gender);
      request.input("GovernmentId", sql.VarChar, details.governmentId);
      request.input("Dob", sql.Date, new Date(details.dob));
      request.input("Nationality", sql.VarChar, details.nationality);
      request.input("Residence", sql.VarChar, details.residence);
      request.input("Phone", sql.VarChar, details.phone);
      request.input("Email", sql.VarChar, details.email);
      request.input("Address", sql.VarChar, details.address);
      request.input("MedicalCondition", sql.VarChar, details.medicalCondition);
      request.input("Allergies", sql.VarChar, details.allergies);

      const result = await request.query(sqlQuery);
      connection.close();

      if (result.recordset.length > 0) {
        const details = result.recordset[0];
        return new PersonalDetails(
          details.id,
          details.firstName,
          details.lastName,
          details.fullName,
          details.gender,
          details.governmentId,
          details.dob,
          details.nationality,
          details.residence,
          details.phone,
          details.email,
          details.address,
          details.medicalCondition,
          details.allergies
        );
      }

      return null;
    } catch (err) {
      console.error("Error creating personal details:", err.message);
      throw err;
    }
  }
}

module.exports = PersonalDetails;



