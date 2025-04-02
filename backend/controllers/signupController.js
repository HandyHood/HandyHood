const { pool, sql } = require("../db/db");
require("dotenv").config();

exports.signup = async (req, res) => {
    const { Username, Email, Password, Name, DateOfBirth, Phone, Address } =
      req.body;
  
    try {
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
  
      const result = await (
        await pool
      )
        .request()
        .input("Username", sql.VarChar(50), Username)
        .input("Email", sql.VarChar(50), Email)
        .input("Password", sql.NVarChar(sql.MAX), Password)
        .input("Name", sql.VarChar(50), Name)
        .input("DateOfBirth", sql.Date, new Date(DateOfBirth)) 
        .input("Phone", sql.VarChar(15), Phone)
        .input("Address", sql.VarChar(50), Address)
        .execute("AddUser"); 
  
      res.status(200).json({
        message: "User added successfully",
        data: result.recordset,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  