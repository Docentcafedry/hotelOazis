import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const client = useQueryClient();
  const { mutate: deleteBooking, isLoading: isLoadingDeletion } = useMutation({
    mutationFn: (id) => deleteBookingApi(id),
    onSuccess: () => {
      toast.success("Successfully deleted");
      client.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (error) => toast.error(error),
  });

  return { deleteBooking, isLoadingDeletion };
}
