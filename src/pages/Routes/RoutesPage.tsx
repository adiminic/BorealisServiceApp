import { Route, Routes } from "react-router-dom"
import HomePage from "../HomePage/HomePage"
import ConfigureServicePage from "../ConfigureServicePage/ConfigureServicePage"
import { StepRoute } from "../../util/constants"


const RoutesPage = () => {
    return(
    <>
    <Routes>
        <Route path={StepRoute.home}>
            <HomePage />
        </Route>
        <Route path={StepRoute.configureService}>
            <ConfigureServicePage />
        </Route>
    </Routes>
    </>
    )
}
export default RoutesPage;