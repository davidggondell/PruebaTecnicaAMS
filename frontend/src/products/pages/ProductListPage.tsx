import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useProducts } from "@/products/hooks/useProducts";
import { SearchBar } from "@/products/components/SearchBar";
import { ProductCard } from "@/products/components/ProductCard";
import { QueryContentWrapper } from "@/common/components/QueryContentWrapper";

export function ProductListPage() {
  const { t } = useTranslation(["common"]);
  const { data: products, isLoading, error } = useProducts();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const filtered = useMemo(() => {
    if (!products) return [];
    if (!query.trim()) return products;
    const q = query.toLowerCase();
    return products.filter((p) => p.brand.toLowerCase().includes(q) || p.model.toLowerCase().includes(q));
  }, [products, query]);

  return (
    <Box className="d-flex direction-column full-height gap-1">
      <Box
        className="d-flex justify-end sticky-top z-10 pt-1 pb-2 px-1"
        sx={{
          backgroundColor: "rgba(248, 250, 252, 0.8)",
          backdropFilter: "blur(8px)",
        }}
      >
        <SearchBar />
      </Box>

      <QueryContentWrapper
        isLoading={isLoading}
        error={error}
        isEmptyList={filtered.length === 0}
        emptyListText={t("noItems")}
      >
        <Grid container spacing={3} className="px-1">
          {filtered.map((product) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </QueryContentWrapper>
    </Box>
  );
}
