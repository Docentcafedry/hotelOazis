import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

export function useCheckout() {
  const client = useQueryClient();

  const { mutate: checkOut, isLoading: isCheckOutLoading } = useMutation({
    mutationFn: ({ bookingId, updatedValues }) =>
      updateBooking(bookingId, updatedValues),
    onSuccess: () => {
      toast.success("Booking checked out!");
      client.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (error) => toast.error(error),
  });

  return { checkOut, isCheckOutLoading };
}
