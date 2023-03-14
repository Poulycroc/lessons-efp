import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from './components/NavBar';
import FeedPage from './pages/FeedPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';

import PrivateRoute from './components/PrivateRoute'

import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

function App() {
  return (
    <Router>
       <div className="App">
        <header>
          <NavBar />
        </header>
        <main>
          <Routes>
            <Route exact path='/' element={<HomePage />} />
            <Route exact path='/profile' element={<PrivateRoute />}>
              <Route exact path='/profile' element={<ProfilePage />} />
            </Route>
            <Route exact path='/login' element={<LoginPage />} />
            <Route exact path='/feed' element={<FeedPage />} />
            <Route path="/feed/:category" element={<FeedPage />} />
          </Routes>
        </main>
      </div>
   </Router>
  );
}

export default App;
