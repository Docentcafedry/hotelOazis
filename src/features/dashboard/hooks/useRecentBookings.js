import { subDays } from "date-fns";
import { getBookingsAfterDate } from "../../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export function useRecentBookings() {
  const [searchParams, setSearchParams] = useSearchParams();

  const days = !searchParams.get("last") ? 7 : Number(searchParams.get("last"));
  const startDate = subDays(new Date(), days).toISOString();

  const { data: bookings, isLoading } = useQuery({
    queryKey: ["bookings", `last-${days}`],
    queryFn: () => getBookingsAfterDate(startDate),
  });

  return { bookings, isLoading, days };
}
