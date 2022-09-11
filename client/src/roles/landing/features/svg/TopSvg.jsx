import React from "react";

const TopSvg = (props) => (
  <div
    style={{
      height: 200,
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
      <rect width="100%" height="100%" fill="#f6f6f6" />
      <path
        d="M0 49.98c150 100.02 349.2-99.96 500 0V160H0Z"
        style={{
          stroke: "none",
          fill: "#1976d2",
        }}
      />
    </svg>
  </div>
);

export default TopSvg;
