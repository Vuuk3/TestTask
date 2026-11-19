import apiClient from "./axios.js";

export const getMods = async () => {
  const response = await apiClient.get("/mods");
  return response;
}

export const getModById = async (id) => {
  const response = await apiClient.get(`/mods/${id}`);
  return response;
}
