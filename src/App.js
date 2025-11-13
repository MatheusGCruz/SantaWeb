import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState, useRef} from "react";
import GoogleAuth from "./components/GoogleAuth";
import { getToken, setToken, clearToken  } from "./auxiliary/authCache";
import { useLocalStorage } from "./auxiliary/useLocalStorage";
import CardBack  from "./components/CardBack"
import FlipCard from "./components/FlipCard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import GroupPage from "./pages/GroupPage";
import PlayerPage from "./pages/PlayerPage";

function App() {
  const [token, setToken] = useLocalStorage("google_token", null);
  const [hasToken, setHasToken] = useState(false);

    const starsRef = useRef(null);

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
        return <div><GoogleAuth token={token} hasToken={hasToken} setToken={setToken}/><p>Carregando...</p></div>;
  }
  return (
    <div className="App">
      <header className="App-header">
      <Router>
        <Routes>
          <Route path="" element={<FlipCard token={token}/>} />
          <Route path="/:groupId" element={<PlayerPage token={token}/>} />
          <Route path="/newGroup" element={<GroupPage token={token}/>} />
        </Routes>
      </Router>
      </header>
      <div><GoogleAuth token={token} hasToken={hasToken} setToken={setToken}/><p>Carregando...</p></div>;
    </div>
  );
}

export default App;
