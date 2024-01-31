import { editCabin as editCabinApi } from "../../../services/apiCabins";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export function useCreateCabin() {
  const client = useQueryClient();
  const { mutate: createCabin, isLoading: isCreatingLoading } = useMutation({
    mutationFn: editCabinApi,
    onSuccess: () => {
      toast.success("Cabin created!");
      client.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error) => toast.error(error),
  });

  return { createCabin, isCreatingLoading };
}
