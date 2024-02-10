import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

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

export async function updateUser({ fullName, password, avatar }) {
  let updateData;
  if (fullName) updateData = { data: { fullName } };
  if (password) updateData = { password };

  const { data, error } = await supabase.auth.updateUser({
    updateData,
  });

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  if (!avatar) return data;

  const imageName = `${Math.random()}-${avatar?.name}`;
  const { storageError } = await supabase.storage
    .from("avatars")
    .upload(imageName, avatar);

  if (storageError) {
    console.log(storageError.message);
    throw new Error(storageError.message);
  }

  const { user, errorUdateUserPhoto } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${imageName}`,
    },
  });

  if (errorUdateUserPhoto) {
    console.log(error.message);
    throw new Error(error.message);
  }

  return user;
}
