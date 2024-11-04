import { BrowserRouter } from 'react-router-dom'
import './App.css'
import RoutesPage from './pages/Routes/RoutesPage'
import { ServiceContextProvider } from './context/ServiceContext'

function App() {

  return (
    <ServiceContextProvider>
      <BrowserRouter>
        <RoutesPage />
      </BrowserRouter>
    </ServiceContextProvider>

  )
}

export default App
