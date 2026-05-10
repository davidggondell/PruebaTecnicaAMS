import { useCallback, useEffect } from "react";
import { useCartStore } from "@/products/store/cartStore";
import { addToCartMutation } from "@/products/queries/productQueries";
import { useMySnackbar } from "@/app/hooks/useMySnackbar";
import type { AddToCartRequest } from "@/products/types/product.types";
import type { CommonMutationParams } from "@/common/interfaces/CommonQueryParams";

export const useAddToCart = () => {
  const { showSnackbar } = useMySnackbar();
  const setCount = useCartStore((s) => s.setCount);

  const {
    mutate: addToCartMutate,
    isPending,
    error,
  } = addToCartMutation({
    onSuccess: (response) => {
      setCount(response.count);
    },
  });

  useEffect(() => {
    if (!error) return;
    showSnackbar({ message: "Failed to add product to cart", variant: "error" });
  }, [error, showSnackbar]);

  const addToCart = useCallback(
    ({ id, colorCode, storageCode, onSuccess, onError }: AddToCartRequest & CommonMutationParams) => {
      addToCartMutate({ id, colorCode, storageCode }, { onSuccess, onError });
    },
    [addToCartMutate],
  );

  return { addToCart, isPending };
};
