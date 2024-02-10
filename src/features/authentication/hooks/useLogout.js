import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigator = useNavigate();
  const { mutate: logout, isLoading: isLoadingLogout } = useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: () => {
      toast.success("Successfully logged in");
      navigator("/login");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Something went wrong during logout!");
    },
  });

  return { logout, isLoadingLogout };
}
