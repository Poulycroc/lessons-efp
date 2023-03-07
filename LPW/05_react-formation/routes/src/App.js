import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from './components/NavBar';
import FeedPage from './pages/FeedPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';

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
             <Route exact path='/' element={<HomePage />}></Route>
             <Route exact path='/profile' element={<ProfilePage />}></Route>
             <Route exact path='/feed' element={<FeedPage />}></Route>
          </Routes>
        </main>
      </div>
   </Router>
  );
}

export default App;
