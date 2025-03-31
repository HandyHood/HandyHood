const { pool, sql } = require("../db/db");
require("dotenv").config();

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await (await pool)
      .request()
      .input("Email", sql.VarChar, email).query(`
        SELECT UserID, Email,
          CONVERT(NVARCHAR(MAX), DecryptByPassPhrase('SecretKey', CAST(Password AS VARBINARY(MAX)))) AS DecryptedPassword
        FROM UserAccount
        WHERE Email = @Email
      `);

    if (result.recordset.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = result.recordset[0];

    // Compare input password with decrypted password
    if (user.DecryptedPassword !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Allow login by returning user data (no JWT)
    res.json({ success: true, userId: user.UserID, email: user.Email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.signup = async (req, res) => {
  const { Username, Email, Password, Name, DateOfBirth, Phone, Address } =
    req.body;

  try {
    // Validate input (optional but recommended)
    if (
      !Username ||
      !Email ||
      !Password ||
      !Name ||
      !DateOfBirth ||
      !Phone ||
      !Address
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Execute stored procedure
    const result = await (
      await pool
    )
      .request()
      .input("Username", sql.VarChar(50), Username)
      .input("Email", sql.VarChar(50), Email)
      .input("Password", sql.NVarChar(sql.MAX), Password)
      .input("Name", sql.VarChar(50), Name)
      .input("DateOfBirth", sql.Date, new Date(DateOfBirth)) // Ensure DateOfBirth is a valid date
      .input("Phone", sql.VarChar(15), Phone)
      .input("Address", sql.VarChar(50), Address)
      .execute("AddUser"); // Call the stored procedure

    res.status(200).json({
      message: "User added successfully",
      data: result.recordset, // Return any output if needed
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
