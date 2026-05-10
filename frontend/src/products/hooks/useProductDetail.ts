import { useEffect } from "react";
import { getProductDetailQuery } from "@/products/queries/productQueries";
import { useMySnackbar } from "@/app/hooks/useMySnackbar";

export const useProductDetail = (id: string | undefined) => {
  const { showSnackbar } = useMySnackbar();
  const { data, isLoading, error } = getProductDetailQuery(id);

  useEffect(() => {
    if (!error) return;
    showSnackbar({ message: "Failed to load product details", variant: "error" });
  }, [error, showSnackbar]);

  return { data, isLoading, error };
};
