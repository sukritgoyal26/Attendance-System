import React from "react";

const CircularProgressBar = ({ percentage, color, title }) => {
  const circleStyles = {
    position: "relative",
    width: "210px",
    height: "210px",
    transform: "rotate(-90deg)",
  };

  const circleBackgroundStyles = {
    width: "100%",
    height: "100%",
    fill: "none",
    stroke: "#f0f0f0",
    strokeWidth: "10",
    strokeLinecap: "round",
  };

  const circleProgressStyles = {
    width: "100%",
    height: "100%",
    fill: "none",
    stroke: color,
    strokeWidth: "10",
    strokeLinecap: "round",
    strokeDasharray: "625px",
    strokeDashoffset: `calc(625px - (625px * ${percentage}) / 100)`,
  };

  const cardStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",

    margin: "0 20px",
    width: "200px",
    height: "270px",
    borderRadius: "5px",

    position: "relative",
  };

  const numberStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    textAlign: "center",
    zIndex: 1,
  };

  const percentageStyles = {
    fontWeight: "200",
    fontSize: "3.5rem",
  };

  const titleStyles = {
    position: "absolute",
    top: "60%",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 1,
    color: color,
    fontWeight: 500,
  };

  return (
    <div className="card" style={cardStyles}>
      <div className="percent">
        <svg style={circleStyles}>
          <circle
            style={circleBackgroundStyles}
            cx="105"
            cy="105"
            r="100"
          ></circle>
          <circle
            style={circleProgressStyles}
            cx="105"
            cy="105"
            r="100"
          ></circle>
        </svg>
        <div className="number" style={numberStyles}>
          <h3 style={percentageStyles}>{percentage}%</h3>
        </div>
      </div>
      <div className="title">
        <h2 style={titleStyles}>{title}</h2>
      </div>
    </div>
  );
};

export default CircularProgressBar;
