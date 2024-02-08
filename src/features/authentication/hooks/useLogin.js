import { login as loginApi } from "../../../services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useLogin() {
  const client = useQueryClient();

  const { mutate: login, isLoading: isLoadingLogin } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: () => {
      toast.success("Successfully logged in");
      client.invalidateQueries(["users"]);
    },
    onError: (error) => {
      toast.error("Something went wrong!");
    },
  });

  return { login, isLoadingLogin };
}
