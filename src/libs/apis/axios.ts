import axios, { AxiosError } from "axios";

export interface ApiError {
  message: string;
  status?: number;
}

export const instance = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export const handleApiError = (
  error: unknown,
  defaultMessage: string,
): ApiError => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    return {
      message: `${defaultMessage}: ${
        axiosError.response?.status || axiosError.message
      }`,
      status: axiosError.response?.status,
    };
  }

  if (error instanceof Error) {
    return {
      message: `${defaultMessage}: ${error.message}`,
    };
  }

  return {
    message: defaultMessage,
  };
};
