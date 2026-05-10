import type { ReactNode } from "react";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { ThemeProvider } from "@mui/material/styles";
import { styled, CssBaseline } from "@mui/material";
import { MaterialDesignContent, SnackbarProvider } from "notistack";
import { queryClient, persister } from "../queries/queryClient";
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
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister, maxAge: 3600000 }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          Components={{
            success: StyledMaterialDesignContent,
            error: StyledMaterialDesignContent,
            warning: StyledMaterialDesignContent,
          }}
        >
          {children}
        </SnackbarProvider>
      </ThemeProvider>
    </PersistQueryClientProvider>
  );
}
