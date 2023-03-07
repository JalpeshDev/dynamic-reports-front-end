import axios, { AxiosError, AxiosResponse } from "axios";
export const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "https://localhost:7101/",
    headers: {
        "Content-Type": "application/json",
    },
});

axiosClient.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (err: AxiosError) => {
        return Promise.reject(err.message);
    }
);