import React from "react";

export const FullscreenLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        padding: "1rem",
      }}
    >
      {children}
    </div>
  );
};
