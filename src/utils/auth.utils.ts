import supabase from "./supabaseClient";

export async function handleSignup({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      return { success: false, error: error.message, data: null };
    }

    return { success: true, error: null, user: data.user };
  } catch (err) {
    return {
      success: false,
      error: `An unexpected error occurred: ${err}`,
      data: null,
    };
  }
}

export async function handleLogin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, error: error.message, data: null };
    }

    return { success: true, error: null, user: data.user };
  } catch (err) {
    return {
      success: false,
      error: `An unexpected error occurred: ${err}`,
      data: null,
    };
  }
}

export async function handleLogout() {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return { success: false, error: error.message, data: null };
    }

    return { success: true, error: null, data: null };
  } catch (err) {
    return {
      success: false,
      error: `An unexpected error occurred: ${err}`,
      data: null,
    };
  }
}
