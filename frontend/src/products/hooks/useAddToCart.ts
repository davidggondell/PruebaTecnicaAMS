import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useCartStore } from "@/products/store/cartStore";
import { useAddToCartMutation } from "@/products/queries/productQueries";
import { useMySnackbar } from "@/app/hooks/useMySnackbar";
import type { AddToCartRequest } from "@/products/types/product.types";
import type { CommonMutationParams } from "@/common/interfaces/CommonQueryParams";

export const useAddToCart = () => {
  const { t } = useTranslation(["products"]);
  const { showSnackbar } = useMySnackbar();
  const setCount = useCartStore((s) => s.setCount);
  const {
    mutate: addToCartMutate,
    isPending,
    error,
  } = useAddToCartMutation({
    onSuccess: (response) => {
      setCount(response.count);
      showSnackbar({
        message: t("addToCartSuccess"),
        variant: "success",
      });
    },
  });

  useEffect(() => {
    if (!error) return;
    showSnackbar({
      message: t("addToCartError"),
      variant: "error",
    });
  }, [error, showSnackbar, t]);

  const addToCart = useCallback(
    ({ id, colorCode, storageCode, onSuccess, onError }: AddToCartRequest & CommonMutationParams) => {
      addToCartMutate({ id, colorCode, storageCode }, { onSuccess, onError });
    },
    [addToCartMutate],
  );

  return { addToCart, isPending };
};
