import logo from "./logo.svg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/LoginPage";
import Navi from "./partials/Navi";
import GifSearchPage from "./pages/GifSearchPage";
import GifSavePage from "./pages/GifSavePage";
import CreateAccount from "./pages/CreateAccount";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import About from "./pages/AboutPage";
import RequireAuth from "./components/RequireAuth";
import { AuthProvider } from "./contexts/authContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const apiKey = "bS07LFfS4YxZqE5wTrcPGMTJfPTO2LxP";
  const [homeImages, setHomeImages] = useState([]);

  useEffect(() => {
    getImages();
  }, []);

  async function getImages() {
    const res = await axios.get(
      `https://api.giphy.com/v1/gifs/trending?&api_key=${apiKey}&rating=g&limit=5`
    );
    setHomeImages(res.data.data);
  }

  /*
  ToDO May 23s
  - FIgure out conditionally rendering based on user
  - Save a gif with an attached logged in user
  - logout not working as expected


  May 30th
  - Deploy app to digialOcean
  
  */

  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Navi />
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/login" element={<Login />} />

            <Route element={<RequireAuth />}>
              <Route path="/search" element={<GifSearchPage />} />
              <Route path="/saved" element={<GifSavePage />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>

      <div className="container">
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
