import axios from "axios";
import {
  ProductsResponse,
  ProductsParams,
  AddProductRequestBody,
} from "@/types/product";

const instance = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function fetchProducts(
  params: ProductsParams = {}
): Promise<ProductsResponse> {
  const { limit = 20, skip = 0, select } = params;

  const searchParams = new URLSearchParams({
    limit: limit.toString(),
    skip: skip.toString(),
  });

  if (select) {
    searchParams.append("select", select);
  }

  try {
    const response = await instance.get<ProductsResponse>(
      `/products?${searchParams.toString()}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `상품 목록을 불러오는데 실패했습니다: ${
          error.response?.status || error.message
        }`
      );
    }
    throw new Error("상품 목록을 불러오는데 실패했습니다");
  }
}

export async function createProduct(
  productData: AddProductRequestBody
): Promise<AddProductRequestBody & { id: number }> {
  try {
    const response = await instance.post<
      AddProductRequestBody & { id: number }
    >("/products/add", productData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `상품 생성에 실패했습니다: ${error.response?.status || error.message}`
      );
    }
    throw new Error("상품 생성에 실패했습니다");
  }
}
