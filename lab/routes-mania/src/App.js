import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import FeedPage from './pages/FeedPage'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header><NavBar /></header>
        <main>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/feed" element={<FeedPage />} />
            <Route path="/feed/:category" element={<FeedPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
