const { pool, sql } = require("../db/db");

exports.getAllTasks = async (req, res) => {
  try {
    const result = await (await pool).request().query("SELECT * FROM Task");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
    res.status(500).json({ error: err.message });
  }
};

exports.updateTaskStatus = async (req, res) => {
  const { taskID } = req.params;
  const { status } = req.body;
  try {
    await (await pool)
      .request()
      .input("TaskID", sql.Int, taskID)
      .input("Status", sql.VarChar(50), status)
      .query("UPDATE Task SET Status = @Status WHERE TaskID = @TaskID");
    res.json({ message: "Task updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  const { taskID } = req.params;
  try {
    await (await pool).request().input("TaskID", sql.Int, taskID).query("DELETE FROM Task WHERE TaskID = @TaskID");
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.assignTask = async (req, res) => {
  const { taskId, userId } = req.body;
  try {
    const poolInstance = await pool;

    const checkResult = await poolInstance
      .request()
      .input("TaskID", sql.Int, taskId)
      .input("UserID", sql.Int, userId)
      .query("SELECT * FROM Schedule WHERE TaskID = @TaskID AND VolunteerUserID = @UserID");

    if (checkResult.recordset.length > 0) {
      return res.status(400).json({ message: "User already assigned to this task" });
    }

    await poolInstance
      .request()
      .input("TaskID", sql.Int, taskId)
      .input("UserID", sql.Int, userId)
      .query("INSERT INTO Schedule (TaskID, VolunteerUserID, Date, Time) VALUES (@TaskID, @UserID, GETDATE(), GETDATE())");

    res.json({ message: "User assigned successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
