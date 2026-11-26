import apiClient from "./axios";

export const getFriends = async () => {
    const response = await apiClient.get("/friends");
    return response;
}

export const addFriend = async (data) => {
    const response = await apiClient.post("/friends", data);
    return response;
}

export const deleteFriend = async (id) => {
    const response = await apiClient.delete(`/friends/${id}`);
    return response;
}