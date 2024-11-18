import express from "express";

import {
  gettAllTask,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

const cartRoutes = express.Router();

cartRoutes.get("/", gettAllTask);
cartRoutes.post("/", createTask);
cartRoutes.put("/id", updateTask);
cartRoutes.delete("/id", deleteTask);

export default cartRoutes;
