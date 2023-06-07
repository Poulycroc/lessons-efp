import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AppContextProviders from '../contexts/AppContextProvider';
import { AuthProvider } from '../contexts/AuthContext';
import { ApiProvider } from '../contexts/ApiContext';
import { ScrollProvider } from '../contexts/ScrollContext';

import PrivateRoute from './../routes/PrivateRoutes';

import LoginPage from './../pages/LoginPage';
import Dashboard from './../pages/Dashboard';
import PostsPage from './../pages/PostsPage';
import PostItemPage from './../pages/PostItemPage';

import NavBar from './NavBar';

function App() {
  const providers = [AuthProvider, ApiProvider, ScrollProvider];

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
          <Route path="/posts/:id" element={<PostItemPage />} />
        </Routes>
      </Router>
    </AppContextProviders>
  )
}

export default App
