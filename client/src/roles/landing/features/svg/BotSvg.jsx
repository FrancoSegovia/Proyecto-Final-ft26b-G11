import React from "react";

const BotSvg = (props) => (
  <div
    style={{
      height: 150,
      overflow: "hidden",
    }}
  >
    <svg
      viewBox="0 0 500 150"
      preserveAspectRatio="none"
      style={{
        height: "100%",
        width: "100%",
      }}
      {...props}
    >
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