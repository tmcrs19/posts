import React from "react";

interface TrendProps {
  trend: string;
}

const Trend: React.FC<TrendProps> = ({ trend }) => {
  return <p>{trend}</p>;
};

export default Trend;
