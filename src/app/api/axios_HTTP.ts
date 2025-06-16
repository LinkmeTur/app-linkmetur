import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

class AxiosHTTP {
    private readonly axiosInstance: AxiosInstance;

    init() {
        return axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL,
        });
    }

    constructor() {
        this.axiosInstance = this.init();
    }

    async doGet(url: string, httpConfig?: AxiosRequestConfig) {
        try {
            const response = await this.axiosInstance.get(url, httpConfig);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return { status: error.response?.status, message: error.message };
            }
        }
    }

    async doPost(url: string, data: unknown, httpConfig?: AxiosRequestConfig) {
        try {
            const response = await this.axiosInstance.post(url, data, httpConfig);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return { status: error.response?.status, message: error.message };
            }
        }
    }

    async doPut(url: string, data: unknown, httpConfig?: AxiosRequestConfig) {
        try {
            const response = await this.axiosInstance.put(url, data, httpConfig);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return { status: error.response?.status, message: error.message };
            }
        }
    }

    async doDelete(url: string, httpConfig?: AxiosRequestConfig) {
        try {
            const response = await this.axiosInstance.delete(url, httpConfig);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return { status: error.response?.status, message: error.message };
            }
        }
    }

    async doPatch(url: string, data: unknown, httpConfig?: AxiosRequestConfig) {
        try {
            const response = await this.axiosInstance.patch(url, data, httpConfig);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return { status: error.response?.status, message: error.message };
            }
        }
    }
}

const api = new AxiosHTTP();

export default api;
