import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  cssVariables: true, // <--- Esto permite que MUI use variables CSS internamente
  palette: {
    primary: {
      main: "#0f172a", // Slate 900 (Muy profesional)
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#6366f1", // Indigo
    },
    background: {
      default: "#f8fafc", // Gris azulado muy claro
      paper: "#ffffff",
    },
    text: {
      primary: "#1e293b",
      secondary: "#64748b",
    },
  },
  shape: {
    borderRadius: 12, // Bordes más redondeados y modernos
  },
  spacing: 8,
  typography: {
    fontFamily: '"Outfit", "Inter", sans-serif', // Una fuente un poco más moderna
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});
