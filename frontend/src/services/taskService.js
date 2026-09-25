import axios from "axios";

// const API_URL = "http://localhost:5500/api/tasks";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5500/api/tasks";

const getTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data.data;
};

const createTask = async (taskData) => {
  const response = await axios.post(API_URL, taskData);
  return response.data.data;
};

const updateTask = async (id, taskData) => {
  const response = await axios.put(`${API_URL}/${id}`, taskData);
  return response.data.data;
};

const deleteTask = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export { getTasks, createTask, updateTask, deleteTask };