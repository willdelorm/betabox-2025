import { useEffect, useState } from "react";
import supabase from "./supabaseClient";
import type { User } from "@supabase/supabase-js";

function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then((session) => {
      setUser(session.data?.session?.user || null);
    });

    const { data } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setUser(session?.user || null);
      }
    );

    // Cleanup subscription on unmount
    return () => data.subscription.unsubscribe();
  }, []);

  return user;
}

export default useAuth;
