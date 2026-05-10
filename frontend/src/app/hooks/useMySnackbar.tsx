import { IconButton, Typography } from "@mui/material";
import { type SnackbarKey, useSnackbar } from "notistack";
import { useCallback } from "react";
import CloseIcon from "@mui/icons-material/Close";

export const useMySnackbar = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const Action = useCallback(
    ({ snackbarId }: { snackbarId: SnackbarKey }) => {
      return (
        <IconButton
          onClick={() => {
            closeSnackbar(snackbarId);
          }}
          sx={{ color: "white" }}
          size="small"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      );
    },
    [closeSnackbar],
  );

  const showSnackbar = useCallback(
    ({
      message,
      variant = "default",
      persist = false,
      canDismiss = false,
    }: {
      message: string;
      variant?: "default" | "error" | "success" | "warning" | "info";
      persist?: boolean;
      canDismiss?: boolean;
    }) => {
      enqueueSnackbar(<Typography variant="body2">{message}</Typography>, {
        variant,
        persist,
        action: canDismiss ? (snackbarId) => <Action snackbarId={snackbarId} /> : undefined,
      });
    },
    [enqueueSnackbar, Action],
  );

  return { showSnackbar };
};
