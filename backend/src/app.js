import express from "express";
import connectDB from "./config/database.js";
import cors from "cors";
import taskRoute from "./routes/task.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

await connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/tasks", taskRoute);
app.use(errorMiddleware);

export default app;
