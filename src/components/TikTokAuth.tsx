import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import tiktokAuthService from '../services/tiktokAuth';
import tiktokApiService from '../services/tiktokApi';

const TikTokAuth: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const handleAuth = async () => {
      const params = new URLSearchParams(location.search);
      const code = params.get('code');
      const error = params.get('error');

      if (error) {
        setError('Authentication failed: ' + error);
        return;
      }

      if (code) {
        try {
          const tokenResponse = await tiktokAuthService.getAccessToken(code);
          
          // Store the tokens securely (you should implement proper token storage)
          localStorage.setItem('tiktok_access_token', tokenResponse.access_token);
          localStorage.setItem('tiktok_refresh_token', tokenResponse.refresh_token);
          
          // Set the access token for API calls
          tiktokApiService.setAccessToken(tokenResponse.access_token);
          
          // Redirect to the dashboard or home page
          navigate('/dashboard');
        } catch (err) {
          setError('Failed to get access token');
          console.error(err);
        }
      }
    };

    handleAuth();
  }, [location, navigate]);

  const handleLogin = () => {
    window.location.href = tiktokAuthService.getAuthUrl();
  };

  return (
    <div className="tiktok-auth">
      {error ? (
        <div className="error-message">
          {error}
          <button onClick={() => setError('')}>Try Again</button>
        </div>
      ) : (
        <button onClick={handleLogin} className="tiktok-login-button">
          Login with TikTok
        </button>
      )}
    </div>
  );
};

export default TikTokAuth; 