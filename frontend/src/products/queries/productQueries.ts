/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery, useMutation } from "@tanstack/react-query";
import { mockProducts } from "@/services/mockProducts";
import type { ProductDetail, AddToCartRequest, CartResponse } from "@/products/types/product.types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getProductsQuery = ({ enabled = true }: { enabled?: boolean } = {}) => {
  return useQuery<ProductDetail[]>({
    queryKey: ["products"],
    queryFn: async () => {
      await delay(400);
      return mockProducts;
    },
    staleTime: 3600000,
    enabled,
  });
};

export const getProductDetailQuery = (id: string | undefined) => {
  return useQuery<ProductDetail | null>({
    queryKey: ["product", id],
    queryFn: async () => {
      await delay(400);
      return mockProducts.find((p) => p.id === id) ?? null;
    },
    staleTime: 3600000,
    enabled: !!id,
  });
};

export const addToCartMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: CartResponse) => void;
  onError?: (error: Error) => void;
} = {}) => {
  return useMutation({
    mutationFn: async (_body: AddToCartRequest) => {
      await delay(400);
      return { count: 1 } as CartResponse;
    },
    onSuccess,
    onError,
  });
};
