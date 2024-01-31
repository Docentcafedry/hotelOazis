import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin() {
  const client = useQueryClient();
  const { mutate: deleteCabin, isLoading: isLoadingDeletion } = useMutation({
    mutationFn: (id) => deleteCabinApi(id),
    onSuccess: () => {
      toast.success("Successfully deleted");
      client.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error) => toast.error(error),
  });

  return { deleteCabin, isLoadingDeletion };
}
