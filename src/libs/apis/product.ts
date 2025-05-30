import axios, { AxiosError } from "axios";
import {
  ProductsResponse,
  ProductsParams,
  AddProductRequestBody,
} from "@/types/product";
interface ApiError {
  message: string;
  status?: number;
}

const instance = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

const handleApiError = (error: unknown, defaultMessage: string): ApiError => {
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

export const fetchProducts = async (
  params: ProductsParams = {},
): Promise<ProductsResponse> => {
  const { limit, skip = 0, select = "" } = params;

  try {
    const response = await instance.get<ProductsResponse>(
      `/products?limit=${limit}&skip=${skip}&select=${select}`,
    );
    return response.data;
  } catch (error) {
    const apiError = handleApiError(
      error,
      "상품 목록을 불러오는데 실패했습니다",
    );
    throw new Error(apiError.message);
  }
};

export const createProduct = async (productData: AddProductRequestBody) => {
  try {
    const response = await instance.post<AddProductRequestBody>(
      "/products/add",
      productData,
    );
    return response.data;
  } catch (error) {
    const apiError = handleApiError(error, "상품 생성에 실패했습니다");
    throw new Error(apiError.message);
  }
};
