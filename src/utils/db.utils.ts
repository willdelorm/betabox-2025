import { Workout } from "./db.types";
import supabase from "./supabaseClient";

export const fetchAllWorkouts = async (): Promise<Workout[]> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error("User is not authenticated");
    return [];
  }

  const { data, error } = await supabase
    .from("workouts")
    .select("*")
    .eq("user_id", user.id)
    .order("date", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
};
