import { BrowserRouter } from "react-router-dom";
import RoutesPage from "./pages/Routes/RoutesPage";
import { ServiceContextProvider } from "./context/ServiceContext";
import "antd/dist/reset.css";

function App() {
  return (
    <ServiceContextProvider>
      <BrowserRouter>
        <RoutesPage />
      </BrowserRouter>
    </ServiceContextProvider>
  );
}

export default App;
