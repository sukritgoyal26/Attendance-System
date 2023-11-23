"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "",
    },
  },
  elements: {
    point: {
      radius: 0, // Set point radius to 0 to hide the points
    },
  },
};

const generateChartData = (color, shadowColor) => {
  const labels = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const gradient = (ctx) => {
    const chart = ctx.chart;
    const { ctx: canvasContext, chartArea } = chart;
    if (!chartArea) {
      // This can happen if the chart is not ready yet
      return null;
    }
    const gradient = canvasContext.createLinearGradient(
      chartArea.left,
      chartArea.top,
      chartArea.left,
      chartArea.bottom
    );
    gradient.addColorStop(0, shadowColor); // Start color

    gradient.addColorStop(0.8, "rgba(0, 0, 0, 0)"); // End color (transparent)
    return gradient;
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Report",
        data: labels.map(() => Math.floor(Math.random() * 2000 - 1000)),
        borderWidth: 3,
        borderColor: color,
        fill: "start", // Enable fill for the area under the line
        backgroundColor: gradient, // Use the custom gradient as the backgroundColor
        tension: 0.7,
      },
    ],
  };

  return data;
};

const LineChart = ({ role, color, shadowColor }) => {
  const data = generateChartData(color, shadowColor);

  return (
    <div className="md:w-[600px] w-full">
      <div className="my-2 flex items-center justify-between">
        <div className="text-medium border border-gray-300 p-2 px-4 rounded-full font-light text-gray-500 mx-2">
          {role}
        </div>
      </div>

      <Line options={options} data={data} />
    </div>
  );
};

export default LineChart;
