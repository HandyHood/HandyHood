const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

router.get("/", taskController.getAllTasks);
router.post("/", taskController.createTask);
router.put("/:taskID", taskController.updateTaskStatus);
router.delete("/:taskID", taskController.deleteTask);
router.post("/addUser", taskController.addUser);
router.post("/assign", taskController.assignTask);

module.exports = router;
