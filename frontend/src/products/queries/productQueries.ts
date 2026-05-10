import { useQuery, useMutation } from "@tanstack/react-query";
import { productService } from "@/services/productService";
import type { ProductDetail, AddToCartRequest, CartResponse } from "@/products/types/product.types";

export const useGetProductsQuery = ({ enabled = true }: { enabled?: boolean } = {}) => {
  return useQuery<ProductDetail[]>({
    queryKey: ["products"],
    queryFn: () => productService.getProducts(),
    staleTime: 3600000,
    enabled,
  });
};

export const useGetProductDetailQuery = (id: string | undefined) => {
  return useQuery<ProductDetail | null>({
    queryKey: ["product", id],
    queryFn: () => (id ? productService.getProductDetail(id) : null),
    staleTime: 3600000,
    enabled: !!id,
  });
};

export const useAddToCartMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: CartResponse) => void;
  onError?: (error: Error) => void;
} = {}) => {
  return useMutation({
    mutationFn: (body: AddToCartRequest) => productService.addToCart(body),
    onSuccess,
    onError,
  });
};
