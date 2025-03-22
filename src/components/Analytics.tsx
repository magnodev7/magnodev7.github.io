import React from 'react';

const Analytics: React.FC = () => {
  return (
    <div className="analytics">
      <h2>Analytics</h2>
      
      <div className="analytics-grid">
        <div className="analytics-card">
          <h3>Crescimento de Seguidores</h3>
          <p>Dados em breve...</p>
        </div>

        <div className="analytics-card">
          <h3>Engajamento por Vídeo</h3>
          <p>Dados em breve...</p>
        </div>

        <div className="analytics-card">
          <h3>Melhores Horários</h3>
          <p>Dados em breve...</p>
        </div>

        <div className="analytics-card">
          <h3>Tendências de Hashtags</h3>
          <p>Dados em breve...</p>
        </div>
      </div>

      <div className="performance-metrics">
        <h3>Métricas de Desempenho</h3>
        <table>
          <thead>
            <tr>
              <th>Métrica</th>
              <th>Últimos 7 dias</th>
              <th>Últimos 30 dias</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Visualizações</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
            </tr>
            <tr>
              <td>Likes</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
            </tr>
            <tr>
              <td>Comentários</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
            </tr>
            <tr>
              <td>Compartilhamentos</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Analytics; 