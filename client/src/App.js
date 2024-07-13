import React from 'react';
import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Sidebar from './Pages/Sidebar';
import Dashboard from './Pages/Dashboard';
import Books from './Pages/Books';
import Members from './Pages/Members';
import Reservations from './Pages/Reservations';
import Settings from './Pages/Settings';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="app">
        {isAuthenticated && <Sidebar />}
        <div className={isAuthenticated ? "main-content" : "content"}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/books" element={<Books />} />
            <Route path="/members" element={<Members />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/register" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;