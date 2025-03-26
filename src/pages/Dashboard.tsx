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
      <main className="flex-1">
        <h1 className="sr-only">Climbing Dashboard</h1>

        {/* Activity Over Time Chart */}
        <div className="mb-12">
          <ActivityChart activityData={activityData} />
        </div>

        {/* Recent Workouts List */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Recent Workouts</h2>
          <ul className="space-y-4">
            {allWorkouts.slice(0, 5).map((workout) => (
              <li
                key={workout.id}
                className="flex justify-between items-center border-b pb-4">
                <div>
                  <h3 className="font-medium text-xl">{workout.name}</h3>
                  <p className="text-gray-500">
                    {workout.type} -{" "}
                    {new Date(workout.date ?? "").toLocaleDateString()}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Link to="/">
        <BtnFooter>Start a Session</BtnFooter>
      </Link>
    </>
  );
}

export default Dashboard;
