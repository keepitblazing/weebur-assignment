import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProducts, createProduct } from "@/libs/apis/product";
import { Product, AddProductRequestBody } from "@/types/product";

interface UseProductsOptions {
  limit?: number;
}

export const useProducts = (options: UseProductsOptions = {}) => {
  const { limit = 20 } = options;
  const queryClient = useQueryClient();

  const query = useQuery<{ products: Product[] }, Error>({
    queryKey: ["products", { limit }],
    queryFn: () => fetchProducts({ limit }),
    staleTime: 5 * 60 * 1000,
  });

  const createMutation = useMutation({
    mutationFn: (data: AddProductRequestBody) => createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  return {
    ...query,
    createProduct: createMutation,
  };
};
