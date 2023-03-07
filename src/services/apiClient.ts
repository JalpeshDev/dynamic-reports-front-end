import { AxiosRequestConfig } from "axios";
import { axiosClient } from "../configs/api.config";


export const get = async (path: string, config?: AxiosRequestConfig) => {
    return await axiosClient
        .get(`${path}`, config)
        .then((response) => response.data);
};