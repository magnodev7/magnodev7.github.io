import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navigation.css';

const Navigation: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    // Redirect to login page
    navigate('/login');
  };

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <h1>TikTok Manager</h1>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/content">Gerenciar Conteúdo</Link>
        </li>
        <li>
          <Link to="/analytics">Analytics</Link>
        </li>
        <li className="logout-link">
          <button onClick={handleLogout}>Sair</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;