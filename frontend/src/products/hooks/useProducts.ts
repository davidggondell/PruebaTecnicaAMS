import { useEffect } from "react";
import { useGetProductsQuery } from "@/products/queries/productQueries";
import { useMySnackbar } from "@/app/hooks/useMySnackbar";

interface UseProductsProps {
  skip?: boolean;
}

export const useProducts = ({ skip = false }: UseProductsProps = {}) => {
  const { showSnackbar } = useMySnackbar();
  const { data, isLoading, error, refetch } = useGetProductsQuery({
    enabled: !skip,
  });

  useEffect(() => {
    if (!error) return;
    showSnackbar({ message: "Failed to load products", variant: "error" });
  }, [error, showSnackbar]);

  return { data, isLoading, error, refetch };
};
