import { Task } from "../models/task.js";

export const gettAllTask = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching tasks",
      error: error.message,
    });
  }
};

export const createTask = async (req, res) => {
  try {
    const { taskName, description } = req.body;

    if (!taskName || !description) {
      req
        .status(400)
        .json({ success: false, message: "Name and description are required" });

      return;
    }

    // Create a new task
    const newTask = new Task({
      name: taskName,
      description,
    });

    // Save the task to the database
    await newTask.save();

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: newTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating task",
      error: error.message,
    });
  }
};

export const updateTask = async (req, res) => {};

export const deleteTask = async (req, res) => {};
