const express = require("express");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createTask); // Only authenticated users can create tasks
router.get("/", protect, getTasks); // Authenticated users can get tasks
router.put("/:id", protect, updateTask); // Authenticated users can update tasks
router.delete("/:id", protect, deleteTask); // Authenticated users can delete tasks

module.exports = router;
