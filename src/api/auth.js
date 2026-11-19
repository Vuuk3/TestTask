import apiClient from "./axios";

export const checkAuth = async () => {
    const response = await apiClient.get("/auth/me");
    return response;
}

export const login = async () => {
    const response = await apiClient.post("/auth/demo-login");
    return response;
}

export const logout = async () => {
    const response = await apiClient.post("/auth/logout");
    return response;
}