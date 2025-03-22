import axios from 'axios';

const TIKTOK_AUTH_URL = 'https://www.tiktok.com/auth/authorize/';
const TIKTOK_API_URL = 'https://open.tiktokapis.com/v2';

export interface TikTokAuthConfig {
  clientKey: string;
  clientSecret: string;
  redirectUri: string;
}

export interface TikTokTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  open_id: string;
  scope: string;
}

class TikTokAuthService {
  private config: TikTokAuthConfig;

  constructor() {
    this.config = {
      clientKey: process.env.REACT_APP_TIKTOK_CLIENT_KEY || '',
      clientSecret: process.env.REACT_APP_TIKTOK_CLIENT_SECRET || '',
      redirectUri: process.env.REACT_APP_TIKTOK_REDIRECT_URI || '',
    };
  }

  getAuthUrl(): string {
    const params = new URLSearchParams({
      client_key: this.config.clientKey,
      response_type: 'code',
      scope: 'user.info.basic,user.info.stats,video.list,video.upload',
      redirect_uri: this.config.redirectUri,
      state: Math.random().toString(36).substring(7), // Generate random state for CSRF protection
    });

    return `${TIKTOK_AUTH_URL}?${params.toString()}`;
  }

  async getAccessToken(code: string): Promise<TikTokTokenResponse> {
    try {
      const response = await axios.post(`${TIKTOK_API_URL}/oauth/token`, {
        client_key: this.config.clientKey,
        client_secret: this.config.clientSecret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: this.config.redirectUri,
      });

      return response.data;
    } catch (error) {
      console.error('Error getting access token:', error);
      throw error;
    }
  }

  async refreshToken(refreshToken: string): Promise<TikTokTokenResponse> {
    try {
      const response = await axios.post(`${TIKTOK_API_URL}/oauth/token`, {
        client_key: this.config.clientKey,
        client_secret: this.config.clientSecret,
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      });

      return response.data;
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error;
    }
  }
}

export const tiktokAuthService = new TikTokAuthService();
export default tiktokAuthService; 