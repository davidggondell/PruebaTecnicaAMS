import { Table, TableBody, TableRow, TableCell, Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { Product } from "@/products/types/product.types";

interface Props {
  product: Product;
}

export function ProductDescription({ product }: Props) {
  const { t } = useTranslation(["products"]);
  const specs: [string, string | number][] = [
    [t("brand"), product.brand],
    [t("model"), product.model],
    [t("price"), `$${product?.price?.toLocaleString() || "-"}`],
    [t("cpu"), product.cpu || "-"],
    [t("ram"), product.ram || "-"],
    [t("os"), product.os || "-"],
    [t("display"), product.screenResolution || "-"],
    [t("battery"), product.battery || "-"],
    [t("camera"), product.cameras || "-"],
    [t("dimensions"), product.dimensions || "-"],
    [t("weight"), product.weight || "-"],
  ];

  return (
    <Box className=" d-flex direction-column gap-1">
      <Typography variant="h5" className="font-bold">
        {product.brand} {product.model}
      </Typography>
      <Typography variant="h4" color={product.price ? "primary" : "error"} sx={{ fontWeight: 700 }}>
        {product.price ? `$${product.price.toLocaleString()}` : t("priceNotAvailable")}
      </Typography>
      <Table size="small">
        <TableBody>
          {specs.map(([label, value]) => (
            <TableRow key={label} sx={{ "&:last-child td": { borderBottom: 0 } }}>
              <TableCell className="font-bold pl-0" sx={{ color: "text.secondary", width: 180 }}>
                {label}
              </TableCell>
              <TableCell className="pl-0">{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
