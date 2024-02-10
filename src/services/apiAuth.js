import supabase from "./supabase";

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }
  console.log(data);

  return data;
}

export async function getUser() {
  const { data: session, error } = await supabase.auth.getSession();

  if (!session.session) return null;

  const {
    data: { user },
    errorUser,
  } = await supabase.auth.getUser();

  if (errorUser) {
    throw new Error(errorUser.message);
  }

  return user;
}

export async function logout() {
  let { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function signUp({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return data;
}
