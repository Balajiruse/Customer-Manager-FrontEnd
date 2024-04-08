/* eslint-disable react/prop-types */
import Chart from "chart.js/auto";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2"


function PieChart({ role, allData }) {
  // Get current window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const data = {
    labels: [
      "Total Tickets",
      "Resolved Tickets",
      "Total Services",
      role === "user" ? "current Services" : "Total Users",
    ],
    datasets: [
      {
        label: "Application Data",
        data: [
          allData.totalTickets,
          allData.resolvedTicket,
          allData.totalService,
          role === "user" ? allData.currSer : allData.totalUser,
        ],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(75, 192, 192)",
          "rgb(255, 205, 86)",
          "rgb(54, 162, 235)",
        ],
        borderColor: "black",
        borderWidth: 0.5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: windowWidth > 500 ? "right" : "top",
        labels: {
          color: "black",
        },
      },
    },
  };

  return <Pie data={data} options={options} />;
}

export default PieChart;