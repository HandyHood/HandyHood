import axios from "axios";

const API_URL = "http://localhost:5001/api";

export const getTasks = async () => {
  const response = await axios.get(`${API_URL}/tasks`);
  return response.data;
};

export const createTask = async (task) => {
  return await axios.post(`${API_URL}/tasks`, task);
};

export const updateTaskStatus = async (taskID, status) => {
  return await axios.put(`${API_URL}/tasks/${taskID}`, { status });
};

export const deleteTask = async (taskID) => {
  return await axios.delete(`${API_URL}/tasks/${taskID}`);
};
