import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filterValue = searchParams.get("status") || "checked-in";

  const sortBy = searchParams.get("sortBy") || "startDate-asc";

  console.log(filterValue);

  const {
    data: bookings,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["bookings", filterValue, sortBy],
    queryFn: () => getBookings({ param: "status", value: filterValue }, sortBy),
  });

  return { bookings, isLoading, isError };
}
