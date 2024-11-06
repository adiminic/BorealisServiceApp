import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { StepRoute } from "./util/constants";
import HomePage from "./pages/HomePage/HomePage";
import ConfigureServicePage from "./pages/ConfigureServicePage/ConfigureServicePage";
import ConfirmServicePage from "./pages/ConfirmServicePage/ConfirmServicePage";
import QuoteSentPage from "./pages/QuoteSentPage/QuoteSentPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import { ServiceContextProvider } from "./context/ServiceContext";
import "antd/dist/reset.css";

const router = createBrowserRouter([
  {
    path: StepRoute.home,
    element: <HomePage />,
  },
  {
    path: StepRoute.configureService,
    element: <ConfigureServicePage />,
  },
  {
    path: StepRoute.confirmService,
    element: <ConfirmServicePage />,
  },
  {
    path: StepRoute.quoteSent,
    element: <QuoteSentPage />,
  },
  {
    path: StepRoute.error,
    element: <ErrorPage />,
  },
  {
    path: "*",
    element: <Navigate to={StepRoute.home} replace />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <ServiceContextProvider>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </ServiceContextProvider>
);
