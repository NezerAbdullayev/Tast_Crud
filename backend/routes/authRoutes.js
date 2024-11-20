import express from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import { a } from "../middleware/authMiddleware.js";

const router = express.Router();
