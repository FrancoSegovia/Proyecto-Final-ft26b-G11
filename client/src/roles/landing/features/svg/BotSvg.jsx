import React from "react";

const BotSvg = (props) => (
  <div
    style={{
      height: 150,
      overflow: "hidden",
      backgroundColor:"transparent"
    }}
  >
    <svg
      viewBox="0 0 500 150"
      preserveAspectRatio="none"
      style={{
        height: "100%",
        width: "100%",
        backgroundColor:"transparent"
      }}
      {...props}
    >
      <rect width="100%" height="100%" fill="#f6f6f6" />
      <path
        d="M0 49.98c150 100.02 271.49-99.96 500 0V0H0Z"
        style={{
          stroke: "none",
          fill: "#1976d2",
        }}
      />
    </svg>
  </div>
);

export default BotSvg;