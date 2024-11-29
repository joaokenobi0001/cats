import React, { useEffect, useState } from 'react';
import { VictoryPie } from 'victory';
import './style.css';

function UserStatsGraphs({ data }) {
  const [adminCount, setAdminCount] = useState(0);
  const [viewerCount, setViewerCount] = useState(0);

  useEffect(() => {
    const admins = data.filter(user => user.role === 'admin').length;
    const viewers = data.filter(user => user.role === 'viewer').length;

    setAdminCount(admins);
    setViewerCount(viewers);
  }, [data]);

  const graphData = [
    { x: 'Admin', y: adminCount },
    { x: 'Viewer', y: viewerCount },
  ];

  return (
    <section className="StyledUserStatsGraphs">
      <div className="total graph-item">
        <p>Total de Usuários: {adminCount + viewerCount}</p>
      </div>
      <div className="graph-item">
        <VictoryPie
          data={graphData}
          innerRadius={50}
          padding={{ top: 20, bottom: 20, left: 80, right: 80 }}
          style={{
            data: {
              fillOpacity: 0.9,
              stroke: '#fff',
              strokeWidth: 2,
            },
            labels: {
              fontSize: 14,
              fill: '#333',
            },
          }}
        />
      </div>
    </section>
  );
}

export default UserStatsGraphs;
