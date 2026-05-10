import { Link, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Typography, Badge, IconButton, Breadcrumbs, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import { useCartStore } from "@/products/store/cartStore";
import { MAX_WIDTH } from "../MainLayout";

export function Header() {
  const location = useLocation();
  const { t } = useTranslation(["common"]);
  const cartCount = useCartStore((s) => s.count);

  const pathSegments = location.pathname.split("/").filter(Boolean);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "rgba(15, 23, 42, 0.9)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid",
        borderColor: "rgba(255, 255, 255, 0.1)",
      }}
    >
      <Toolbar>
        <Box
          className="full-width d-flex items-center gap-2"
          sx={{
            maxWidth: MAX_WIDTH,
            mx: "auto",
          }}
        >
          <Box
            component={Link}
            to="/"
            className="d-flex items-center gap-1 mr-3"
            sx={{
              textDecoration: "none",
              color: "inherit",
              "&:hover": { opacity: 0.9 },
            }}
          >
            <SmartphoneIcon />
            <Typography variant="h6" className="font-bold" sx={{ lineHeight: 1 }}>
              {t("appName")}
            </Typography>
          </Box>

          <Breadcrumbs aria-label="breadcrumb" className="flex-grow" color="primary.contrastText">
            <Typography
              component={Link}
              to="/"
              sx={{
                color: "primary.contrastText",
                textDecoration: "none",
                fontSize: "0.875rem",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              {t("products")}
            </Typography>
            {pathSegments.map((segment, index) => {
              const path = "/" + pathSegments.slice(0, index + 1).join("/");
              const isLast = index === pathSegments.length - 1;
              const label = segment === "product" ? t("products").slice(0, -1) : segment;
              return isLast ? (
                <Typography
                  key={path}
                  sx={{ color: "primary.contrastText", fontSize: "0.875rem" }}
                  component={Link}
                  to={path}
                >
                  {label}
                </Typography>
              ) : null;
            })}
          </Breadcrumbs>

          <IconButton color="inherit" aria-label="cart">
            <Badge badgeContent={cartCount} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
