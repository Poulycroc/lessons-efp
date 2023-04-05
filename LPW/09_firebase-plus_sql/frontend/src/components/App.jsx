import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AppContextProviders from '../contexts/AppContextProvider';
import { AuthProvider } from '../contexts/AuthContext';
import { ApiProvider } from '../contexts/ApiContext';

import PrivateRoute from './../routes/PrivateRoutes';

import LoginPage from './../pages/LoginPage';
import Dashboard from './../pages/Dashboard';
import PostsPage from './../pages/PostsPage';
import PostItemPage from './../pages/PostItemPage';

import NavBar from './NavBar';

function App() {
  const providers = [AuthProvider, ApiProvider];

  return (
    <AppContextProviders components={providers}>
      <Router>
        <NavBar />

        <Routes>
          <Route element={<PrivateRoute />}>
            <Route element={<Dashboard/>} path="/" />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/post/:id" element={<PostItemPage />} />
        </Routes>
      </Router>
    </AppContextProviders>
  )
}

export default App
