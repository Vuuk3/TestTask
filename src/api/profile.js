import apiClient from "./axios";

export const getProfile = async () => {
    const response = await apiClient.get("/profile");
    return response;
}

export const updateProfile = async (data) => {
    const response = await apiClient.patch("/profile", data);
    return response;
}

export const getSkin = async () => {
    const response = await apiClient.get("/profile/skin", { responseType: "blob" });
    return response;
}

export const updateSkin = async (data) => {
    const response = await apiClient.put("/profile/skin", data);
    return response;
}

export const deleteSkin = async () => {
    const response = await apiClient.delete("/profile/skin");
    return response;
}
