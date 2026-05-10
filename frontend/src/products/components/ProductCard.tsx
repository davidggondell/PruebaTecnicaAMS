import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import type { Product } from "@/products/types/product.types";

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  return (
    <Card
      component={Link}
      to={`/product/${product.id}`}
      className="d-flex direction-column full-height overflow-hidden"
      sx={{
        textDecoration: "none",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        border: "1px solid",
        borderColor: "divider",
        position: "relative",
        "&:hover": {
          boxShadow: "0 12px 24px -10px rgba(15,23,42,0.15)",
          transform: "translateY(-6px)",
          borderColor: "rgba(15,23,42,0.4)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.imageUrl}
        alt={`${product.brand} ${product.model}`}
        className="p-2"
        sx={{ objectFit: "contain", bgcolor: "grey.50" }}
      />
      <CardContent className="flex-grow">
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {product.brand}
        </Typography>
        <Typography variant="h6" component="div" noWrap>
          {product.model}
        </Typography>
        <Typography
          variant="h6"
          color="primary"
          className="mt-1"
          sx={{ fontWeight: 700 }}
        >
          ${product.price.toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
}
