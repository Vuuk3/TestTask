import apiClient from "./axios.js";

export const getServers = async () => {
  const response = await apiClient.get("/servers");
  return response;
}

export const getServerById = async (id) => {
  const response = await apiClient.get(`/servers/${id}`);
  return response;
}
