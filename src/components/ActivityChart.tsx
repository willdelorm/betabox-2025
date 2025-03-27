import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  // Legend,
  ChartOptions,
} from "chart.js";
import type { ActivityData } from "../utils/activity.utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  // Legend
);

const ActivityChart = ({ activityData }: { activityData: ActivityData[] }) => {
  const primaryColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--color-primary")
    .trim();
  const primaryColorTransparent = `${primaryColor}60`; // Add 60 for transparency

  const chartData = {
    labels: activityData.map((item) => item.monthYear),
    datasets: [
      {
        label: "Total Workouts",
        data: activityData.map((item) => item.workoutCount),
        backgroundColor: primaryColorTransparent,
        borderColor: primaryColor,
        borderWidth: 1,
      },
    ],
  };

  const chartOptions: ChartOptions<"bar"> = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: false,
          text: "Workout Count",
        },
      },
      x: {
        reverse: true,
        title: {
          display: false,
          text: "Month/Year",
        },
      },
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default ActivityChart;
