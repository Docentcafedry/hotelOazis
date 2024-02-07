import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

export function useCheckin() {
  const client = useQueryClient();

  const { mutate: checkIn, isLoading: isCheckInLoading } = useMutation({
    mutationFn: ({ bookingId, updatedValues }) =>
      updateBooking(bookingId, updatedValues),
    onSuccess: () => {
      toast.success("Booking checked in!");
      client.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (error) => toast.error(error),
  });

  return { checkIn, isCheckInLoading };
}
