import { editCabin as editCabinApi } from "../../../services/apiCabins";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export function useEditCabin() {
  const client = useQueryClient();
  const { mutate: editCabin, isLoading: isEditingLoading } = useMutation({
    mutationFn: ({ editedCabin, id }) => editCabinApi(editedCabin, id),
    onSuccess: () => {
      toast.success("Cabin edited!");
      client.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error) => toast.error(error),
  });

  return { editCabin, isEditingLoading };
}
