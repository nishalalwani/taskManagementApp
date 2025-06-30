
import API from "./api";

export const loginUser = async (email, password) => {
  const response = await API.post("/login", { email, password });
  return response.data;
};

export const signupUser = async (email, password) => {
  const response = await API.post("/signup", { email, password });
  return response.data;
};
