import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { profileAPI } from '../api/api';

interface ProfileData {
  username: string;
  bio: string;
  followerCount: string;
  followingCount: string;
  likeCount: string;
  videoCount: number;
}

interface AnalyticsData {
  profile: ProfileData;
  videoCount: number;
  engagement: number;
  topVideos: any[];
}

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch profile data
        const profileResponse = await profileAPI.getProfile();
        setProfileData(profileResponse.data.data);
        
        // Fetch analytics data
        const analyticsResponse = await profileAPI.getAnalytics();
        setAnalyticsData(analyticsResponse.data.data);
        
        setLoading(false);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Erro ao carregar dados do TikTok');
        setLoading(false);
        console.error('Error fetching TikTok data:', err);
      }
    };
    
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="dashboard loading">
        <p>Carregando dados do TikTok...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard error">
        <p>Erro: {error}</p>
        <p>Verifique se suas credenciais do TikTok estão configuradas corretamente.</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-card">
        <h2>Visão Geral</h2>
        <p>Total de Vídeos: {profileData?.videoCount || 0}</p>
        <p>Visualizações Totais: {profileData?.likeCount || 0}</p>
        <p>Seguidores: {profileData?.followerCount || 0}</p>
      </div>
      <div className="dashboard-card">
        <h2>Desempenho Recente</h2>
        <p>Novos Seguidores: {analyticsData?.profile?.followerCount || 0}</p>
        <p>Likes nos Últimos 7 Dias: {analyticsData?.engagement || 0}%</p>
        <p>Comentários nos Últimos 7 Dias: {analyticsData?.topVideos?.length || 0}</p>
      </div>
      <div className="dashboard-card">
        <h2>Próximos Conteúdos</h2>
        <p>Vídeos Agendados: {analyticsData?.videoCount || 0}</p>
        <p>Próximo Vídeo: {(analyticsData?.topVideos && analyticsData.topVideos.length > 0) ? 'Disponível' : 'Nenhum agendado'}</p>
      </div>
    </div>
  );
};

export default Dashboard;