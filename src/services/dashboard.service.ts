import { axiosClient } from "../configs/api.config";


export const getReportingColumns = async () => {
    try {
        const res = await axiosClient.get("ReportingData/GetReportingColumns");
        return res;
    } catch (error) {
        throw error;
    }
}

export const getReportingData = async () => {
    try {
        const res = await axiosClient.get("ReportingData/GetReportingData");
        return res?.data;
    } catch (error) {
        throw error;
    }
}