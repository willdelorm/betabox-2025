import { useState, useEffect } from "react";
import { Link } from "react-router";
import BtnFooter from "../components/BtnFooter";
import Nav from "../components/Nav";
import { fetchAllWorkouts } from "../utils/db.utils";
import ActivityChart from "../components/ActivityChart";
import type { Workout } from "../utils/db.types";
import { groupWorkoutsByMonth } from "../utils/activity.utils";

function Dashboard() {
  const [allWorkouts, setAllWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    const getData = async () => {
      const recent = await fetchAllWorkouts();
      setAllWorkouts(recent);
    };

    getData();
  }, []);

  const activityData = groupWorkoutsByMonth(allWorkouts);

  return (
    <>
      <Nav />
      <main className="flex-1 w-[95%] py-3">
        <h1 className="sr-only">Climbing Dashboard</h1>

        {/* Activity Over Time Chart */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Activity</h2>
          <ActivityChart activityData={activityData} />
        </div>

        {/* Recent Workouts List */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Recent Workouts</h2>
          <ul className="space-y-3">
            {allWorkouts.slice(0, 5).map((workout) => (
              <li
                key={workout.id}
                className="flex justify-between items-center border-b pb-2">
                <div>
                  <h3 className="font-medium">
                    {workout.name || workout.type}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(workout.date ?? "").toLocaleDateString()}{" "}
                    {workout.duration && `- ${workout.duration}min`}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Link to="/new-workout">
        <BtnFooter>Start a Session</BtnFooter>
      </Link>
    </>
  );
}

export default Dashboard;
