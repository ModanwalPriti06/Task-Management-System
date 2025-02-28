const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// ➤ Create Task (POST)
router.post("/createTask", async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = await Task.create({ title, description });
    res.status(200).json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error });
  }
});

// ➤ Get All Tasks (GET)
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(400).json({ error: error });
  }
});

// ➤ Delete Task (DELETE)
router.delete("/deleteTask/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ➤ Update Task (PUT)
router.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    res.status(200).json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
