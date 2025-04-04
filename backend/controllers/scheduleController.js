const { pool } = require("../db/db");

const assignUserToTask = async (req, res) => {
  const { taskID, userID, date, time } = req.body;

  try {
    const dbPool = await pool;
    // Validate that the task and user exist
    const taskCheck = await dbPool
      .request()
      .input("taskID", taskID)
      .query("SELECT * FROM Task WHERE TaskID = @taskID");
    if (taskCheck.recordset.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    const userCheck = await dbPool
      .request()
      .input("userID", userID)
      .query("SELECT * FROM UserAccount WHERE UserID = @userID");
    if (userCheck.recordset.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Insert into Schedule table
    await dbPool
      .request()
      .input("taskID", taskID)
      .input("userID", userID)
      .input("date", date)
      .input("time", time)
      .query(
        "INSERT INTO Schedule (TaskID, VolunteerUserID, Date, Time) VALUES (@taskID, @userID, @date, @time)",
      );

    res.status(201).json({ message: "User assigned to task successfully" });
  } catch (error) {
    console.error("Error assigning user to task:", error);
    res.status(500).json({ error: "Failed to assign user to task" });
  }
};

module.exports = { assignUserToTask };
