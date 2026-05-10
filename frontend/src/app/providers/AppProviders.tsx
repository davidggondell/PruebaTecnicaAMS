import type { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material/styles";
import { styled, CssBaseline } from "@mui/material";
import { MaterialDesignContent, SnackbarProvider } from "notistack";
import { queryClient } from "../queries/queryClient";
import { theme } from "../theme/theme";

const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  "&.notistack-MuiContent-success": {
    backgroundColor: theme.palette.primary.main,
  },
  "&.notistack-MuiContent-error": {
    backgroundColor: theme.palette.error.dark,
  },
  "&.notistack-MuiContent-warning": {
    backgroundColor: theme.palette.warning.main,
  },
}));

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          Components={{
            success: StyledMaterialDesignContent,
            error: StyledMaterialDesignContent,
            warning: StyledMaterialDesignContent,
          }}
        >
          {children}
        </SnackbarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
