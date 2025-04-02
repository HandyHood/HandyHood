// backend/controllers/taskController.js
const { pool, sql } = require("../db/db");

exports.getAllTasks = async (req, res) => {
  try {
    const result = await (await pool).request().query(`
      SELECT t.TaskID, t.CreatorUserID, t.LocationID, t.Title, t.Description, t.Status, 
             s.UserID AS AssignedUserID, u.Username AS AssignedUsername
      FROM Task t
      LEFT JOIN Schedule s ON t.TaskID = s.TaskID
      LEFT JOIN [User] u ON s.UserID = u.UserID
    `);
    res.json(result.recordset);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ error: "Failed to fetch tasks: " + err.message });
  }
};

exports.createTask = async (req, res) => {
  const { creatorUserID, locationID, title, description, status } = req.body;
  try {
    await (await pool)
      .request()
      .input("CreatorUserID", sql.Int, creatorUserID)
      .input("LocationID", sql.Int, locationID)
      .input("Title", sql.VarChar(50), title)
      .input("Description", sql.VarChar(200), description)
      .input("Status", sql.VarChar(50), status)
      .query(
        "INSERT INTO Task (CreatorUserID, LocationID, Title, Description, Status) VALUES (@CreatorUserID, @LocationID, @Title, @Description, @Status)"
      );
    res.status(201).json({ message: "Task created successfully" });
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).json({ error: "Failed to create task: " + err.message });
  }
};

exports.updateTaskStatus = async (req, res) => {
  const { taskID } = req.params;
  const { status } = req.body;
  try {
    const result = await (await pool)
      .request()
      .input("TaskID", sql.Int, taskID)
      .input("Status", sql.VarChar(50), status)
      .query("UPDATE Task SET Status = @Status WHERE TaskID = @TaskID");
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "Task status updated successfully" });
  } catch (err) {
    console.error("Error updating task status:", err);
    res.status(500).json({ error: "Failed to update task status: " + err.message });
  }
};

exports.deleteTask = async (req, res) => {
  const { taskID } = req.params;
  try {
    const result = await (await pool)
      .request()
      .input("TaskID", sql.Int, taskID)
      .query("DELETE FROM Task WHERE TaskID = @TaskID");
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ error: "Failed to delete task: " + err.message });
  }
};

exports.assignTask = async (req, res) => {
  const { taskID, userID, date, time } = req.body; // Updated to match frontend payload

  try {
    const poolInstance = await pool;

    // Validate task exists
    const taskCheck = await poolInstance
      .request()
      .input("TaskID", sql.Int, taskID)
      .query("SELECT * FROM Task WHERE TaskID = @TaskID");
    if (taskCheck.recordset.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Validate user exists
    const userCheck = await poolInstance
      .request()
      .input("UserID", sql.Int, userID)
      .query("SELECT * FROM [User] WHERE UserID = @UserID");
    if (userCheck.recordset.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if user is already assigned to the task
    const checkResult = await poolInstance
      .request()
      .input("TaskID", sql.Int, taskID)
      .input("UserID", sql.Int, userID)
      .query("SELECT * FROM Schedule WHERE TaskID = @TaskID AND UserID = @UserID");

    if (checkResult.recordset.length > 0) {
      return res.status(400).json({ message: "User already assigned to this task" });
    }

    // Insert into Schedule table
    await poolInstance
      .request()
      .input("TaskID", sql.Int, taskID)
      .input("UserID", sql.Int, userID)
      .input("Date", sql.Date, date)
      .input("Time", sql.Time, time)
      .query(
        "INSERT INTO Schedule (TaskID, UserID, Date, Time) VALUES (@TaskID, @UserID, @Date, @Time)"
      );

    res.status(201).json({ message: "User assigned to task successfully" });
  } catch (err) {
    console.error("Error assigning user to task:", err);
    res.status(500).json({ error: "Failed to assign user to task: " + err.message });
  }
};