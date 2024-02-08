import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../../services/apiAuth";

export function useGetUser() {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUser,
  });

  return { user, isError, isLoading };
}
