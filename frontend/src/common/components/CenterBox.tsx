import type { ReactNode } from "react";
import { Box } from "@mui/material";

interface CenterBoxProps {
  children: ReactNode;
}

export function CenterBox({ children }: CenterBoxProps) {
  return (
    <Box
      className="d-flex direction-column items-center justify-center full-width flex-grow"
      sx={{
        minHeight: "100px",
        maxHeight: "250px",
      }}
    >
      {children}
    </Box>
  );
}
