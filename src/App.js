import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SetsPage from './pages/SetsPage';
import './App.css';

const App = () => {
  const isUserAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route
          path="/home"
          element={isUserAuthenticated ? <HomePage /> : <Navigate to="/" replace />}
        />
        <Route path="/sets/:directoryId" element={<SetsPage />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;