const Task = require("../models/taskModel");

// Create a new task
const createTask = async (req, res) => {
  const { title, description, category, assignedTo, dueDate } = req.body;
  const userId = req.user.id;

  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  try {
    const task = await Task.create({
      title,
      description,
      category,
      assignedTo,
      createdBy: userId,
      dueDate,
    });
    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Server error while creating task" });
  }
};

// Get all tasks (Admins can view all tasks, regular users only their own)
const getTasks = async (req, res) => {
  try {
    let tasks;
    if (req.user.role === "admin") {
      tasks = await Task.find().populate(
        "assignedTo createdBy",
        "username email"
      );
    } else {
      tasks = await Task.find({ createdBy: req.user.id }).populate(
        "assignedTo",
        "username email"
      );
    }
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Server error while fetching tasks" });
  }
};

// Update a task (Only admin or task creator)
const updateTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    let task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (
      req.user.role !== "admin" &&
      task.createdBy.toString() !== req.user.id
    ) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this task" });
    }

    task = await Task.findByIdAndUpdate(taskId, req.body, { new: true });
    res.status(200).json(task);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Server error while updating task" });
  }
};

// Delete a task (Only admin or task creator)
const deleteTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (
      req.user.role !== "admin" &&
      task.createdBy.toString() !== req.user.id
    ) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this task" });
    }

    await task.remove();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Server error while deleting task" });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
