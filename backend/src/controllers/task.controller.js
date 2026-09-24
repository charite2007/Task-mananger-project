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
    const { title, description, completed, priority } = req.body;
    const id = req.params.id;
    const task = await Task.findByIdAndUpdate(
      id,
      {
        title,
        description,
        completed,
        priority,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!task)
      return res
        .status(404)
        .json({ success: false, message: "Task Not Found" });

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Internal server error`, Error: error.message });
    console.log(`Error :${error}`);
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