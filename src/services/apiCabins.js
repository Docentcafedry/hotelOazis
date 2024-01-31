import supabase from "./supabase";

const supabaseUrl = "https://chmxwomcygqppcafonqr.supabase.co";

export async function getCabins() {
  let { data: cabins, error } = await supabase.from("cabins").select("*");

  return cabins;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("something went wrong");
  }

  return data;
}

export async function createCabin(newCabin) {
  console.log("from create");
  const imageName = `${Math.random()}-${newCabin.image.name}}`
    .replaceAll("/", "")
    .replaceAll("}", "");

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  console.log(imageName, imagePath);
  console.log(newCabin);

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }]);

  if (error) {
    console.log(error);
    throw new Error("something went wrong");
  }

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    // console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}

export async function editCabin(editedCabin, id) {
  console.log("from edit");
  const imageName = `${Math.random()}-${editedCabin.image.name}}`
    .replaceAll("/", "")
    .replaceAll("}", "");

  const imagePathExists = editedCabin.image?.startsWith?.(supabaseUrl);

  const imagePath = imagePathExists
    ? editedCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query;

  console.log(id);
  if (!id)
    query = await supabase
      .from("cabins")
      .insert([{ ...editedCabin, image: imagePath }]);

  if (id)
    query = await supabase
      .from("cabins")
      .update({ ...editedCabin, image: imagePath })
      .eq("id", id)
      .select();

  const { data, error } = query;

  if (error) {
    console.log(error.message);
    throw new Error("something went wrong");
  }

  if (imagePathExists) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, editedCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    // console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}
