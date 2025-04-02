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

    if (user.DecryptedPassword !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ success: true, userId: user.UserID, email: user.Email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
