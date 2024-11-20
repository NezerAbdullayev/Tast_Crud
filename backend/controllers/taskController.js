import { Task } from "../models/task.js";
// get  -get all tasks
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
// post - create new task
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
// put
export const updateTask = async (req, res) => {
  try {
    const { updatedTaskDescription } = req.body;
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Task ID is required!",
      });
    }

    if (!updatedTaskDescription) {
      return res.status(400).json({
        success: false,
        message: "Description is required!",
      });
    }

    // Find task by ID
    const task = await Task.findOne({ _id: id });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found!",
      });
    }

    // updating task description
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { description: updatedTaskDescription },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Task updated successfully!",
      updatedTask,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the task.",
      error: error.message,
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      return res
        .statud(400)
        .json({ success: false, message: "ID is required!" });

    // deleted task
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask)
      return res
        .status(404)
        .json({ success: false, message: "Task not found!" });

    return res
      .status(200)
      .json({ success: true, messsage: "Task deleted successfully!" });
    //
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the task.",
      error: error.message,
    });
  }
};
