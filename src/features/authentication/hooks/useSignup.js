import { signUp as signUpApi } from "../../../services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignUp() {
  const client = useQueryClient();
  const navigator = useNavigate();

  const { mutate: signUp, isLoading: isLoadingSignUp } = useMutation({
    mutationFn: ({ fullName, email, password }) =>
      signUpApi({ fullName, email, password }),
    onSuccess: () => {
      toast.success("Successfully signed up");
      client.invalidateQueries(["users"]);
      navigator("/dashboard");
    },
    onError: (error) => {
      toast.error("Something went wrong during signing up!");
    },
  });

  return { signUp, isLoadingSignUp };
}
