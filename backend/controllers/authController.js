const { pool, sql } = require("../db/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await (await pool)
      .request()
      .input("Email", sql.VarChar, email)
      .query("SELECT UserID, Email, Password FROM UserAccount WHERE Email = @Email");

    if (result.recordset.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = result.recordset[0];
    const isMatch = await bcrypt.compare(password, user.Password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.UserID, email: user.Email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, userId: user.UserID });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
