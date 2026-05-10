import { Link, useParams } from "react-router-dom";
import { Box, Grid, Button, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useProductDetail } from "@/products/hooks/useProductDetail";
import { ProductImage } from "@/products/components/ProductImage";
import { ProductDescription } from "@/products/components/ProductDescription";
import { ProductActions } from "@/products/components/ProductActions";
import { QueryContentWrapper } from "@/common/components/QueryContentWrapper";

export function ProductDetailPage() {
  const { t } = useTranslation(["common"]);
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useProductDetail(id);

  return (
    <Box className="d-flex direction-column flex-grow">
      <Button
        component={Link}
        to="/"
        startIcon={<ArrowBackIcon />}
        className="mb-3"
        sx={{ alignSelf: "flex-start" }}
      >
        {t("back")}
      </Button>

      <QueryContentWrapper
        isLoading={isLoading}
        error={error}
        isEmptyList={!product}
        emptyListText={t("noItems")}
      >
        {product && (
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <ProductImage imageUrl={product.imageUrl} alt={`${product.brand} ${product.model}`} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <ProductDescription product={product} />
              <Divider className="my-3" />
              <ProductActions product={product} />
            </Grid>
          </Grid>
        )}
      </QueryContentWrapper>
    </Box>
  );
}
