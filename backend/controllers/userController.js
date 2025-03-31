const { pool, sql } = require("../db/db");

exports.getUsers = async (req, res) => {
  try {
    const result = await (await pool).request().query("SELECT UserID, Username, Email FROM UserAccount");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
