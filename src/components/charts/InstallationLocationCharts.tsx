import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface InstallationLocationChartsProps {
  topLocations: [string, number][];
  totalInstallations: number;
}

const InstallationLocationCharts: React.FC<InstallationLocationChartsProps> = ({
  topLocations,
  totalInstallations,
}) => {
  // Prepare data for charts
  const labels = topLocations.map(([location]) => location);
  const data = topLocations.map(([, count]) => count);
  const percentages = topLocations.map(([, count]) =>
    ((count / totalInstallations) * 100).toFixed(1)
  );

  // Color palette for charts
  const colors = [
    "#10b981", // green-500
    "#3b82f6", // blue-500
    "#f59e0b", // yellow-500
    "#8b5cf6", // purple-500
    "#ef4444", // red-500
  ];

  // Bar chart configuration
  const barChartData = {
    labels,
    datasets: [
      {
        label: "Installations",
        data,
        backgroundColor: colors.map((color) => `${color}80`), // 50% opacity
        borderColor: colors,
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        borderColor: "#10b981",
        borderWidth: 1,
        callbacks: {
          label: function (context: any) {
            const index = context.dataIndex;
            return [
              `Installations: ${context.parsed.y}`,
              `Percentage: ${percentages[index]}%`,
            ];
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#ffffff",
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#ffffff",
          font: {
            size: 12,
          },
        },
        beginAtZero: true,
      },
    },
  };

  // Pie chart configuration
  const pieChartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: colors,
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 2,
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "#ffffff",
          font: {
            size: 12,
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        borderColor: "#10b981",
        borderWidth: 1,
        callbacks: {
          label: function (context: any) {
            const index = context.dataIndex;
            return [
              `${context.label}: ${context.parsed} installations`,
              `Percentage: ${percentages[index]}%`,
            ];
          },
        },
      },
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Bar Chart */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h3 className="text-lg font-semibold text-green-400 mb-4">
          Installation Count by Location
        </h3>
        <div className="h-64">
          <Bar data={barChartData} options={barChartOptions} />
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h3 className="text-lg font-semibold text-blue-400 mb-4">
          Geographic Distribution
        </h3>
        <div className="h-64">
          <Pie data={pieChartData} options={pieChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default InstallationLocationCharts;
