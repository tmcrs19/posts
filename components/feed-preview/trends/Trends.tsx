import React from "react";
import Trend from "./Trend";

export const Trends: React.FC = () => {
  const trendList = ["#trend1", "#trend2", "#trend3", "#trend4", "#trend5"];

  return (
    <div className="border border-white rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Trends</h2>
      <div className="space-y-4">
        {trendList.map((trend, index) => (
          <Trend key={index} trend={trend} />
        ))}
      </div>
    </div>
  );
};
