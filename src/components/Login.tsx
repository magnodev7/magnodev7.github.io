import React from 'react';
import { useNavigate } from 'react-router-dom';
import tiktokAuthService from '../services/tiktokAuth';
import './Login.css';

interface LoginProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleTikTokLogin = () => {
    window.location.href = tiktokAuthService.getAuthUrl();
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <h2>Login</h2>
        <div className="tiktok-login">
          <button onClick={handleTikTokLogin} className="tiktok-login-button">
            Entrar com TikTok
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;