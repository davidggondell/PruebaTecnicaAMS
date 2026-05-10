import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./app/theme/global.scss";
import "./app/i18n/i18n";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense
      fallback={
        <div className="full-page-loader">
          <div className="loader-spinner" />
          <div className="loader-text">PhoneStore</div>
        </div>
      }
    >
      <App />
    </Suspense>
  </StrictMode>,
);
