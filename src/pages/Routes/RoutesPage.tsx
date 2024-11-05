import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import ConfigureServicePage from "../ConfigureServicePage/ConfigureServicePage";
import { StepRoute } from "../../util/constants";
import ConfirmServicePage from "../ConfirmServicePage/ConfirmServicePage";
import QuoteSentPage from "../QuoteSentPage/QuoteSentPage";

const RoutesPage = () => {
  return (
    <>
      <Routes>
        <Route path={StepRoute.home} element={<HomePage />} />
        <Route
          path={StepRoute.configureService}
          element={<ConfigureServicePage />}
        />
        <Route
          path={StepRoute.confirmService}
          element={<ConfirmServicePage />}
        />
        <Route path={StepRoute.quoteSent} element={<QuoteSentPage />} />
        <Route path="*" element={<Navigate to={StepRoute.home} replace />} />
      </Routes>
    </>
  );
};
export default RoutesPage;
