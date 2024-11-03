import { Navigate, Route, Routes } from "react-router-dom"
import HomePage from "../HomePage/HomePage"
import ConfigureServicePage from "../ConfigureServicePage/ConfigureServicePage"
import { StepRoute } from "../../util/constants"


const RoutesPage = () => {
    return(
    <>
    <Routes>
        <Route path={StepRoute.home} element={<HomePage />} />
        <Route path={StepRoute.configureService} element={<ConfigureServicePage />} />
        <Route path="*" element={<Navigate to={StepRoute.home} replace />} />
    </Routes>
    </>
    )
}
export default RoutesPage;