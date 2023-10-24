import axios, { AxiosInstance, AxiosResponse } from "axios";
import { IForm } from "../components/Login";

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

export const logIn = async (endpoint: string, data: IForm): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await api.post(endpoint, data);
    return response.data;
  } catch (error: any) {
    alert(`Oooops... 
    User is ${error.response.statusText} :(`);
    throw error;
  }
};

export default api;
