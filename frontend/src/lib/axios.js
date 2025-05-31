import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "https://sturdy-couscous-445967xppjg3766x-5001.app.github.dev/api" : "/api",
    withCredentials:true,
})