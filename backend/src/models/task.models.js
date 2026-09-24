import mongoose from "mongoose"


export const taskSchema = new mongoose.Schema({
 title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
      maxlength: [100, "Task title cannot exceed 100 characters"],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
      default: "",
    },

    completed: {
      type: Boolean,
      default: false,
    },
        priority: {
      type: String,
      required: [true, "Priority is required"],
      enum: ["low", "medium", "high"],
    },
},{timestamps:true})

const Task = mongoose.model("Tasks",taskSchema)

export default Task