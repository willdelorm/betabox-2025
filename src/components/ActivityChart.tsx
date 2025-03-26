import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import type { ActivityData } from "../utils/activity.utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ActivityChart = ({
  activityData,
}: { activityData: ActivityData[] }) => {
  const chartData = {
    labels: activityData.map((item) => item.monthYear),
    datasets: [
      {
        label: "Workouts Over Time",
        data: activityData.map((item) => item.workoutCount),
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default ActivityChart;
