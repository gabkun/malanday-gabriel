import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import './App.css';
import Home from "./components/Home";
import Team from "./components/Team";
import TeamMember from "./components/TeamMember";
import AppNavbar from './components/AppNavbar';

function App() {
  return (
    <Router>
      <AppNavbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/team" element={<Team />} />
          <Route path="/team/:id" element={<TeamMember />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
