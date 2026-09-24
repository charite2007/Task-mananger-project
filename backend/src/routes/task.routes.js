import express from "express"
import { createTask, deleteTask, getAllTasks, getTaskById, updateTasks } from "../controllers/task.controller.js";


const taskRoute = express.Router()
taskRoute.get("/",getAllTasks)
taskRoute.post("/create",createTask)
taskRoute.get("/:id",getTaskById)
taskRoute.put("/:id",updateTasks)
taskRoute.delete("/:id",deleteTask)
export default taskRoute