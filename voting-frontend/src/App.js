import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import VotingComponent from './components/VotingComponent';
import ResultsPage from './components/ResultsPage';
import AdminPage from './components/AdminPage';
import AdminDashboard from './components/AdminDashboard';
import CandidateDashboard from './components/CandidateDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/vote" element={<VotingComponent />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/Candidate" element={<CandidateDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;