import React from 'react';

interface StatsProps {
  total: number;
  completed: number;
}

const Stats: React.FC<StatsProps> = ({ total, completed }) => (
  <div className="stats">
    <p>Total: {total} | Completed: {completed}</p>
  </div>
);

export default Stats;
