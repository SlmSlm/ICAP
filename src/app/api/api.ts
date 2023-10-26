import axios, { AxiosInstance, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { IForm } from "../components/Login";
import { IDataItem } from "../types/interfaces";

const BASE_URL: string = "https://technical-task-api.icapgroupgmbh.com";

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const getTable = async (endpoint: string): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await api.get(endpoint);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const patchTable = async (
  endpoint: string,
  body: IDataItem
): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await api.patch(endpoint, body);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const logIn = async (endpoint: string, data: IForm): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await api.post(endpoint, data);
    return response.data;
  } catch (error: any) {
    toast.error(`${error.response.statusText}. Ooops, user doesn't exist`);
    throw error;
  }
};

export default api;
