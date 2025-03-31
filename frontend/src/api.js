import axios from "axios";

const API_URL = "http://localhost:5001/api";

export const login = async (email, password) => {
  return await axios.post(`${API_URL}/auth/login`, { email, password });
};

export const getUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

export const assignTask = async (taskId, userId) => {
  return await axios.post(`${API_URL}/tasks/assign`, { taskId, userId });
};
