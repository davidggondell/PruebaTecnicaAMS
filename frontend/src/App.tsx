import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./app/routes/AppRoutes";
import { AppProviders } from "./app/providers/AppProviders";

function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProviders>
  );
}

export default App;
