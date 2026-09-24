import express from "express"
import connectDB from "./config/database.js";

const app = express()
await connectDB()
app.use(express.json())

export default app