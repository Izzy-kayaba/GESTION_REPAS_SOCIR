// LineChart.tsx
import React from 'react';
import { Chart as ChartsJs, defaults, plugins } from "chart.js/auto";
import { Line } from 'react-chartjs-2';

defaults.maintainAspectRatio = false;
defaults.responsive = false;

// Define the prop type
type LineChartProps = {
  data: any[];
};

const LineChart: React.FC<LineChartProps> = ({ data }) => {

  // Prepare the chart data
  const chartData: any = {
    labels: data.map((item) => item.year.toString()), // Assuming year is a string
    datasets: [
      {
        label: 'Users Gained',
        data: data.map((item) => item.userGain),
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        tension: 0.1
      },
      {
        label: 'Developers ',
        data: [20, 100, 80, 32],
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              text: "Monthly revenue"
            }
          },
          scales: {
            x: {
              type: 'linear', // Assuming x-axis is numeric
              position: 'bottom',
            },
            y: {
              beginAtZero: true,
            },
          },
        }} />
  );
};

export default LineChart;
