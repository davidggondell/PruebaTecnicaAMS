import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { TextField, InputAdornment } from "@mui/material";
import { useTranslation } from "react-i18next";
import SearchIcon from "@mui/icons-material/Search";

export function SearchBar() {
  const { t } = useTranslation(["products"]);
  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.get("q") ?? "";

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = e.target.value;
      if (next) {
        setSearchParams({ q: next });
      } else {
        setSearchParams({});
      }
    },
    [setSearchParams],
  );

  return (
    <TextField
      fullWidth
      size="small"
      placeholder={t("searchPlaceholder")}
      value={value}
      onChange={handleChange}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        },
      }}
      sx={{
        maxWidth: 500,
        "& .MuiOutlinedInput-root": {
          borderRadius: "50px",
          backgroundColor: "background.paper",
          "& fieldset": {
            borderColor: "divider",
          },
          "&:hover fieldset": {
            borderColor: "primary.light",
          },
        },
      }}
    />
  );
}
