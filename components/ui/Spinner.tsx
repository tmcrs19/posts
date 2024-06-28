import React from "react";

export const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div
        className="rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"
        style={{
          borderTopColor: "#3498db",
          animation: "spin 1s linear infinite",
        }}
      ></div>
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};
