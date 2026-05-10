import { Box } from "@mui/material";

interface Props {
  imageUrl: string | null;
  alt: string;
}

export function ProductImage({ imageUrl, alt }: Props) {
  return (
    <Box
      className="d-flex justify-center items-center p-4"
      sx={{
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        minHeight: 400,
        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
      }}
    >
      {imageUrl ? (
        <Box
          component="img"
          src={imageUrl}
          alt={alt}
          sx={{
            maxWidth: "100%",
            maxHeight: 400,
            objectFit: "contain",
          }}
        />
      ) : (
        <Box sx={{ color: "text.disabled" }}>No Image Available</Box>
      )}
    </Box>
  );
}
