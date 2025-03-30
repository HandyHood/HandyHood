require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { pool } = require("./db/db");

const app = express();
app.use(cors());
app.use(express.json());

const taskRoutes = require("./routes/taskRoutes");
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("Community Help API is running...");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
