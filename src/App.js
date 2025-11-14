import './App.css';
import React from "react";
import GoogleAuth from "./components/GoogleAuth";
import { useLocalStorage } from "./auxiliary/useLocalStorage";
import FlipCard from "./pages/FlipCard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GroupPage from "./pages/GroupPage";
import PlayerPage from "./pages/PlayerPage";
import ErrorPage from './pages/ErrorPage';

function App() {
  const [token, setToken] = useLocalStorage("google_token", null);

  // useEffect(() => {
  //   const starCount = 160;
  //   const starsEl = starsRef.current;
  //   const rand = (min, max) => Math.random() * (max - min) + min;
  //   const frag = document.createDocumentFragment();

  //   for (let i = 0; i < starCount; i++) {
  //     const s = document.createElement("div");
  //     s.className = "star";
  //     if (Math.random() < 0.12) s.classList.add("big");
  //     if (Math.random() < 0.06) s.classList.add("cross");

  //     s.style.left = `${rand(0, 100)}%`;
  //     s.style.top = `${rand(0, 100)}%`;
  //     s.style.animationDuration = `${rand(1.6, 6.0).toFixed(2)}s`;
  //     s.style.animationDelay = `${rand(-6, 6).toFixed(2)}s`;

  //     frag.appendChild(s);
  //   }

  //   starsEl.appendChild(frag);

  //   return () => {
  //     starsEl.innerHTML = "";
  //   };
  // }, []);
  
  if(!token ){
        return( 
          <div className="App">
      <header className="App-header">          
        <GoogleAuth token={token} setToken={setToken} />
          <ErrorPage/>
          </header></div>
    );
  }
  return (
    <div className="App">
      <header className="App-header">
      <Router>
        <Routes>
          <Route path="" element={<FlipCard token={token} setToken={setToken}/>} />
          <Route path="/:groupId" element={<PlayerPage token={token}/>} />
          <Route path="/newGroup" element={<GroupPage token={token}/>} />
        </Routes>
      </Router>
      </header>
    </div>
  );
}

export default App;
