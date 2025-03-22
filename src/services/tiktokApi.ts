import axios from 'axios';

const TIKTOK_API_URL = 'https://open.tiktokapis.com/v2';

export interface TikTokUser {
  open_id: string;
  union_id: string;
  avatar_url: string;
  avatar_url_100: string;
  avatar_large_url: string;
  display_name: string;
  bio_description: string;
  profile_deep_link: string;
  is_verified: boolean;
  follower_count: number;
  following_count: number;
  likes_count: number;
  video_count: number;
}

export interface TikTokVideo {
  id: string;
  create_time: number;
  cover_image_url: string;
  share_url: string;
  video_description: string;
  duration: number;
  height: number;
  width: number;
  title: string;
  like_count: number;
  comment_count: number;
  share_count: number;
  view_count: number;
}

class TikTokApiService {
  private accessToken: string = '';

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  private getHeaders() {
    return {
      'Authorization': `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json',
    };
  }

  async getUserInfo(): Promise<TikTokUser> {
    try {
      const response = await axios.get(
        `${TIKTOK_API_URL}/user/info/`,
        { headers: this.getHeaders() }
      );
      return response.data.data;
    } catch (error) {
      console.error('Error fetching user info:', error);
      throw error;
    }
  }

  async getUserVideos(cursor: string = ''): Promise<{
    videos: TikTokVideo[];
    cursor: string;
    has_more: boolean;
  }> {
    try {
      const response = await axios.get(
        `${TIKTOK_API_URL}/video/list/`,
        {
          headers: this.getHeaders(),
          params: {
            cursor,
            max_count: 20,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.error('Error fetching user videos:', error);
      throw error;
    }
  }

  async getVideoStats(videoId: string): Promise<{
    like_count: number;
    comment_count: number;
    share_count: number;
    view_count: number;
  }> {
    try {
      const response = await axios.get(
        `${TIKTOK_API_URL}/video/query/`,
        {
          headers: this.getHeaders(),
          params: {
            video_id: videoId,
            fields: ['like_count', 'comment_count', 'share_count', 'view_count'],
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.error('Error fetching video stats:', error);
      throw error;
    }
  }
}

export const tiktokApiService = new TikTokApiService();
export default tiktokApiService; 