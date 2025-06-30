
import axios from "axios";

const API = axios.create({
  baseURL: "https://taskmanagementapp-m39y.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

//Automatically attach token to each request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
