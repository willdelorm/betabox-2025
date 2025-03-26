import { Workout } from "./db.types";

export const groupWorkoutsByMonth = (workouts: Workout[]) => {
  const workoutsByMonth: { [key: string]: number } = {};

  workouts.forEach((workout) => {
    // Get the year and month from the workout date (e.g., "2025-03")
    const monthYear = new Date(workout.date).toISOString().slice(0, 7); // Format: "YYYY-MM"

    // Increment the count for the specific month-year
    if (workoutsByMonth[monthYear]) {
      workoutsByMonth[monthYear] += 1;
    } else {
      workoutsByMonth[monthYear] = 1;
    }
  });

  // Convert the result to an array and return
  const result = Object.keys(workoutsByMonth).map((monthYear) => ({
    monthYear,
    workoutCount: workoutsByMonth[monthYear],
  }));

  return result;
};

export type ActivityData = {
  monthYear: string;
  workoutCount: number;
};