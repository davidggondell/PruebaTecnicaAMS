import { Table, TableBody, TableRow, TableCell, Typography } from '@mui/material'
import { useTranslation } from "react-i18next";
import type { Product } from "@/products/types/product.types";

interface Props {
  product: Product
}

export function ProductDescription({ product }: Props) {
  const { t } = useTranslation(["products"]);
  const specs: [string, string | number][] = [
    [t("brand"), product.brand],
    [t("model"), product.model],
    [t("price"), `$${product.price.toLocaleString()}`],
    [t("cpu"), product.cpu],
    [t("ram"), product.ram],
    [t("os"), product.os],
    [t("display"), product.screenResolution],
    [t("battery"), product.battery],
    [t("camera"), product.cameras],
    [t("dimensions"), product.dimensions],
    [t("weight"), product.weight],
  ]

  return (
    <>
      <Typography variant="h5" gutterBottom className="font-bold">
        {product.brand} {product.model}
      </Typography>
      <Typography variant="h5" color="primary" gutterBottom sx={{ fontWeight: 700 }}>
        ${product.price.toLocaleString()}
      </Typography>
      <Table size="small" className="mt-2">
        <TableBody>
          {specs.map(([label, value]) => (
            <TableRow key={label} sx={{ "&:last-child td": { borderBottom: 0 } }}>
              <TableCell
                component="th"
                className="font-bold pl-0"
                sx={{ color: "text.secondary", width: 180 }}
              >
                {label}
              </TableCell>
              <TableCell className="pl-0">{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
