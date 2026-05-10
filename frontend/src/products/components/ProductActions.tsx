import { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem, Button, Typography, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import type { ProductDetail } from "@/products/types/product.types";
import { useAddToCart } from "@/products/hooks/useAddToCart";

interface Props {
  product: ProductDetail;
}

export function ProductActions({ product }: Props) {
  const { t } = useTranslation(["products"]);
  const [storage, setStorage] = useState(product.storageOptions[0]?.code ?? "");
  const [color, setColor] = useState(product.colorOptions[0]?.code ?? "");
  const { addToCart, isPending } = useAddToCart();

  const handleAdd = () => {
    addToCart({
      id: product.id,
      colorCode: color,
      storageCode: storage,
    });
  };

  return (
    <Stack spacing={3} className="mt-3">
      <Typography variant="h6" className="font-bold">
        {t("selectOptions")}
      </Typography>

      <FormControl fullWidth size="small" disabled={!product.price}>
        <InputLabel id="storage-label">{t("storage")}</InputLabel>
        <Select
          labelId="storage-label"
          value={storage}
          label={t("storage")}
          onChange={(e) => setStorage(e.target.value)}
        >
          {product.storageOptions.map((opt) => (
            <MenuItem key={opt.code} value={opt.code}>
              {opt.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth size="small" disabled={!product.price}>
        <InputLabel id="color-label">{t("color")}</InputLabel>
        <Select labelId="color-label" value={color} label={t("color")} onChange={(e) => setColor(e.target.value)}>
          {product.colorOptions.map((opt) => (
            <MenuItem key={opt.code} value={opt.code}>
              {opt.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        size="large"
        startIcon={<AddShoppingCartIcon />}
        onClick={handleAdd}
        disabled={!product.price || isPending}
        fullWidth
        className="py-3"
      >
        {t("addToCart")}
      </Button>
    </Stack>
  );
}
