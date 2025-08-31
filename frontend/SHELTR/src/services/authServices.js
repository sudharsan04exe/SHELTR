import api from "./api";

export const loginUser = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data; // Typically includes token and user info
};

export const signupUser = async (userData) => {
  const response = await api.post("/auth/signup", userData);
  return response.data;
};

export const logoutUser = async () => {
  // If backend supports logout endpoint; else just clear token locally
  const response = await api.post("/auth/logout");
  return response.data;
};
