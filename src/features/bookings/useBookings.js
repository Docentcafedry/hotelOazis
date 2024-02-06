import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/globalVars";

export function useBookings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const client = useQueryClient();

  const filterValue = searchParams.get("status") || "checked-in";

  const sortBy = searchParams.get("sortBy") || "startDate-asc";

  const page = Math.ceil(searchParams.get("page")) || 1;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["bookings", filterValue, sortBy, page],
    queryFn: () =>
      getBookings({ param: "status", value: filterValue }, sortBy, page),
  });

  const numberOfPages = Math.ceil(data?.count / PAGE_SIZE);

  if (page < numberOfPages) {
    client.prefetchQuery({
      queryKey: ["bookings", filterValue, sortBy, page + 1],
      queryFn: () =>
        getBookings({ param: "status", value: filterValue }, sortBy, page + 1),
    });
  }

  if (page > 1) {
    client.prefetchQuery({
      queryKey: ["bookings", filterValue, sortBy, page - 1],
      queryFn: () =>
        getBookings({ param: "status", value: filterValue }, sortBy, page - 1),
    });
  }

  return { data, isLoading, isError };
}
