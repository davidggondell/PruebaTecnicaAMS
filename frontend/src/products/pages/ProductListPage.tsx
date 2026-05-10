import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, Grid, Pagination } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useProducts } from "@/products/hooks/useProducts";
import { SearchBar } from "@/products/components/SearchBar";
import { ProductCard } from "@/products/components/ProductCard";
import { QueryContentWrapper } from "@/common/components/QueryContentWrapper";

const PAGE_SIZE = 20;

export function ProductListPage() {
  const { t } = useTranslation(["common", "products"]);
  const { data: products, isLoading, error } = useProducts();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!products) return [];
    if (!query.trim()) return products;
    const q = query.toLowerCase();
    return products.filter((p) => p.brand.toLowerCase().includes(q) || p.model.toLowerCase().includes(q));
  }, [products, query]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [filtered]);

  useEffect(() => {
    const mainElement = document.querySelector("main");
    if (mainElement) {
      mainElement.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [page]);

  const pagedProducts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  return (
    <Box className="d-flex direction-column full-height full-width gap-1">
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
        emptyListText={t("noItems", { ns: "products" })}
      >
        <Box className="flex-grow d-flex direction-column gap-4">
          <Grid container spacing={3} className="px-1">
            {pagedProducts.map((product) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>

          {totalPages > 1 && (
            <Box className="d-flex justify-center ">
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, v) => setPage(v)}
                color="primary"
                shape="rounded"
              />
            </Box>
          )}
        </Box>
      </QueryContentWrapper>
    </Box>
  );
}
