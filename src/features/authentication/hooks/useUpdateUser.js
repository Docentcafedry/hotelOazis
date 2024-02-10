import { updateUser as updateDataApi } from "../../../services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const client = useQueryClient();

  const { mutate: updateUser, isLoading: isLoadingUpdateUser } = useMutation({
    mutationFn: updateDataApi,
    onSuccess: () => {
      toast.success("Successfully updated user");
      client.invalidateQueries(["users"]);
    },
    onError: (error) => {
      toast.error("Something went wrong during updating!");
    },
  });

  return { updateUser, isLoadingUpdateUser };
}
