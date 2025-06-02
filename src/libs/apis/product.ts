import { instance, handleApiError } from "./axios";
import {
  ProductsResponse,
  ProductsParams,
  AddProductRequestBody,
} from "@/types/product";

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
