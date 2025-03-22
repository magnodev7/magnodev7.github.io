import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ContentManager from './components/ContentManager';
import Analytics from './components/Analytics';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Register from './components/Register';
import { authAPI } from './api/api';
import TikTokAuth from './components/TikTokAuth';
import TikTokUserProfile from './components/TikTokUserProfile';
import './styles/tiktok.css';
import './App.css';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is authenticated on component mount
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          const response = await authAPI.getMe();
          setIsAuthenticated(true);
          console.log('Authentication successful:', response.data);
        } catch (error) {
          console.error('Authentication error:', error);
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  // Protected route component
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (loading) return <div>Carregando...</div>;
    
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    
    return <>{children}</>;
  };

  return (
    <Router>
      <div className="app">
        {isAuthenticated && <Navigation />}
        <main className="main-content">
          <Routes>
            <Route path="/login" element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" />} />
            <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/content" element={
              <ProtectedRoute>
                <ContentManager />
              </ProtectedRoute>
            } />
            <Route path="/analytics" element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;