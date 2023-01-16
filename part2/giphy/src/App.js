import Navi from './partials/Navi';
import { BrowserRouter as Router,
          Routes, Route 
        } from 'react-router-dom'
import './App.css';
import HomePage from './components/pages/HomePage';
import AboutPage from './components/pages/AboutPage';
import RegisterPage from './components/pages/RegisterPage';
import LoginPage from './components/pages/LoginPage';
import GifSearchPage from './components/pages/GifSearchPage';
import GifSavePage from './components/pages/GifSavePage';


function App() {
  
  return (
    <div className="App">
      <Router>
        <Navi />
        <Routes>
          {/* index = /  reddit.com */}
          <Route index element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/gifs/search' element={<GifSearchPage />} />
          <Route path='/gifs/saved' element={<GifSavePage />} />
        </Routes>
      </Router>



    </div>
  );
}

export default App;
