import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;


app.use(express.json({ limit: "50mb" }));

app.use("/api/task",taskRoutes );




const api = process.env.API_URL;
connectDB();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
