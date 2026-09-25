import Task from "../models/task.models.js";

// getting all the tasks
export const getAllTasks = async (req, res) => {
  try {
    const task = await Task.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      totalTask: task.length,
      data: task,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Internal server error  `, Error: error.message });
    console.log(`Error :${error}`);
  }
};

// creation of the task

export const createTask = async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    const task = await Task.create({
      title,
      description,
      priority,
    });

    res.status(201).json({
      success: true,
      message: "Task has been create successfully",
      data: task,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Internal server error`, Error: error.message });
    console.log(`Error :${error}`);
  }
};

// getting on task by its id

export const getTaskById = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findById(id);

    if (!task)
      return res
        .status(404)
        .json({ success: false, message: "Task Not Found" });

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Internal server error`, Error: error.message });
    console.log(`Error :${error}`);
  }
};

// updating the task with id

export const updateTasks = async (req, res) => {
   try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const {
      title,
      description,
      completed,
      priority,
    } = req.body;

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.completed = completed ?? task.completed;
    task.priority = priority ?? task.priority;

    const updatedTask = await task.save();

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// deleting the task by id 

export const deleteTask = async(req,res)=>{
    try {
        const id = req.params.id
        const task = await Task.findByIdAndDelete(id)
        if(!task)return res.status(404).json({message:"Task Not Found"})
            res.status(200).json({success:true,message:"Task has been deleted"})
    } catch (error) {
          res
      .status(500)
      .json({ message: `Internal server error`, Error: error.message });
    console.log(`Error :${error}`);
    }
}