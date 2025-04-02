const express = require("express");
const router = express.Router();
const { assignUserToTask } = require("../controllers/scheduleController");

router.post("/assign", assignUserToTask);

module.exports = router;