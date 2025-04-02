require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { pool } = require("./db/db");

const app = express();
app.use(cors());
app.use(express.json());

const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/schedule", scheduleRoutes);

app.get("/", (req, res) => {
  res.send("HandyHood API is running...");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
