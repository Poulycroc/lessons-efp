import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './../contexts/AuthContext'

import PrivateRoutes from './../guards/PrivateRoutes'

import LoginPage from './../pages/LoginPage'
import DashboardPage from './../pages/DashboardPage'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route element={<PrivateRoutes />}>
            <Route path='/' exact element={<DashboardPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
