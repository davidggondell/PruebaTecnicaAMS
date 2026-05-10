import type { ReactNode } from "react";
import { Alert, CircularProgress, Typography } from "@mui/material";
import { CenterBox } from "./CenterBox";

interface QueryContentWrapperProps {
  children: ReactNode;
  error?: Error | null;
  errorText?: string;
  isLoading: boolean;
  isEmptyList?: boolean;
  emptyListText?: string;
}

export function QueryContentWrapper({
  children,
  error,
  errorText = "An error occurred",
  isLoading,
  isEmptyList = false,
  emptyListText = "No items found",
}: QueryContentWrapperProps) {
  if (isLoading) {
    return (
      <CenterBox>
        <CircularProgress />
      </CenterBox>
    );
  }

  if (error) {
    return (
      <CenterBox>
        <Alert severity="error" sx={{ width: "100%", maxWidth: 600 }}>
          {errorText || (error as Error).message}
        </Alert>
      </CenterBox>
    );
  }

  if (isEmptyList) {
    return (
      <CenterBox>
        <Typography variant="h6" color="text.secondary">
          {emptyListText}
        </Typography>
      </CenterBox>
    );
  }

  return <>{children}</>;
}
