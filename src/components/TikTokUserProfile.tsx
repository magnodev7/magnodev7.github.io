import React, { useEffect, useState } from 'react';
import tiktokApiService, { TikTokUser, TikTokVideo } from '../services/tiktokApi';

const TikTokUserProfile: React.FC = () => {
  const [user, setUser] = useState<TikTokUser | null>(null);
  const [videos, setVideos] = useState<TikTokVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await tiktokApiService.getUserInfo();
        setUser(userData);

        const videosData = await tiktokApiService.getUserVideos();
        setVideos(videosData.videos);
      } catch (err) {
        setError('Failed to fetch user data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="tiktok-profile">
      {user && (
        <div className="user-info">
          <img src={user.avatar_url} alt={user.display_name} className="avatar" />
          <h2>{user.display_name}</h2>
          <p>{user.bio_description}</p>
          <div className="stats">
            <div className="stat">
              <span className="label">Followers</span>
              <span className="value">{user.follower_count}</span>
            </div>
            <div className="stat">
              <span className="label">Following</span>
              <span className="value">{user.following_count}</span>
            </div>
            <div className="stat">
              <span className="label">Likes</span>
              <span className="value">{user.likes_count}</span>
            </div>
            <div className="stat">
              <span className="label">Videos</span>
              <span className="value">{user.video_count}</span>
            </div>
          </div>
        </div>
      )}

      <div className="videos-grid">
        {videos.map((video) => (
          <div key={video.id} className="video-card">
            <img src={video.cover_image_url} alt={video.title} />
            <div className="video-info">
              <h3>{video.title}</h3>
              <p>{video.video_description}</p>
              <div className="video-stats">
                <span>👍 {video.like_count}</span>
                <span>💬 {video.comment_count}</span>
                <span>👀 {video.view_count}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TikTokUserProfile; 