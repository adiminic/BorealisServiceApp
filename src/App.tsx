import { BrowserRouter, Navigate } from 'react-router-dom'
import './App.css'
import RoutesPage from './pages/Routes/RoutesPage'
import ServiceContextProvider from './context/ServiceContext'
import { StepRoute } from './util/constants'

function App() {

  return (
    <ServiceContextProvider>
      <BrowserRouter basename='borealis-service'>
        {<Navigate to={StepRoute.home} />}
        <RoutesPage />
      </BrowserRouter>
    </ServiceContextProvider>

  )
}

export default App
