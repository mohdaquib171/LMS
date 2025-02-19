import axios from "axios";
import { BACKEND_URL } from "../config";

export const loginAdmin = async (username, password) => {
  return await axios.post(`${BACKEND_URL}/auth/adminlogin`, {
    username,
    password,
  });
};

export const registerUser = async (userData) => {
  return await axios.post(`${BACKEND_URL}/auth/register`, userData);
};

export const loginUser = async (username, password) => {
  return await axios.post(`${BACKEND_URL}/auth/login`, {
    username,
    password,
  });
};