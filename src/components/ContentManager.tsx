import React, { useState } from 'react';

interface Video {
  id: string;
  title: string;
  status: 'draft' | 'scheduled' | 'published';
  scheduledDate?: string;
}

const ContentManager: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [newVideo, setNewVideo] = useState({ title: '', scheduledDate: '' });

  const handleAddVideo = () => {
    if (newVideo.title) {
      const video: Video = {
        id: Date.now().toString(),
        title: newVideo.title,
        status: newVideo.scheduledDate ? 'scheduled' : 'draft',
        scheduledDate: newVideo.scheduledDate || undefined,
      };
      setVideos([...videos, video]);
      setNewVideo({ title: '', scheduledDate: '' });
    }
  };

  return (
    <div className="content-manager">
      <h2>Gerenciador de Conteúdo</h2>
      
      <div className="add-video-form">
        <h3>Adicionar Novo Vídeo</h3>
        <div>
          <input
            type="text"
            placeholder="Título do Vídeo"
            value={newVideo.title}
            onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
          />
          <input
            type="datetime-local"
            value={newVideo.scheduledDate}
            onChange={(e) => setNewVideo({ ...newVideo, scheduledDate: e.target.value })}
          />
          <button onClick={handleAddVideo}>Adicionar Vídeo</button>
        </div>
      </div>

      <div className="video-list">
        <h3>Seus Vídeos</h3>
        {videos.length === 0 ? (
          <p>Nenhum vídeo encontrado</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Status</th>
                <th>Data Agendada</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {videos.map((video) => (
                <tr key={video.id}>
                  <td>{video.title}</td>
                  <td>{video.status}</td>
                  <td>{video.scheduledDate || 'N/A'}</td>
                  <td>
                    <button onClick={() => {/* Implementar edição */}}>Editar</button>
                    <button onClick={() => {/* Implementar exclusão */}}>Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ContentManager; 