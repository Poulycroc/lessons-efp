import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import GuestRoute from "./components/GuestRoute";
import useAuth from "./useAuth";
import AuthContext from "./contexts/authContext";

import NavBar from "./components/NavBar";
import FeedPage from "./pages/FeedPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      <Router>
        <div className="App">
          <header>
            <NavBar />
          </header>
          <main>
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route element={<PrivateRoute />}>
                <Route exact path="/profile" element={<ProfilePage />} />
              </Route>
              <Route element={<GuestRoute />}>
                <Route path="/login" element={<LoginPage />} />
              </Route>
              <Route exact path="/feed" element={<FeedPage />} />
              <Route path="/feed/:category" element={<FeedPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
