import axios from "axios"

export const axiosInstance = axios.create({
    // baseURL: import.meta.env.MODE === "development" ? "https://chat-app-c6pa.onrender.com/api" : "/api",
    baseURL: "https://chat-app-c6pa.onrender.com/api",
    withCredentials:true,
})