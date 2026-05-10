import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { Header } from "./components/Header";

export const MAX_WIDTH = 1400;
export const CONTENT_MAX_WIDTH = 1200;

export function MainLayout() {
  return (
    <Box className="d-flex direction-column full-height overflow-hidden gap-2">
      <Header />
      <Box
        component="main"
        className="flex-grow overflow-auto d-flex direction-column items-center pb-4"
      >
        <Box
          className="full-width d-flex direction-column flex-grow px-2"
          sx={{
            maxWidth: CONTENT_MAX_WIDTH,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
