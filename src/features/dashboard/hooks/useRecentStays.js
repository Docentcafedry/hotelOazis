import { subDays } from "date-fns";
import { getStaysAfterDate } from "../../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export function useRecentStays() {
  const [searchParams, setSearchParams] = useSearchParams();

  const days = !searchParams.get("last") ? 7 : Number(searchParams.get("last"));
  const startDate = subDays(new Date(), days).toISOString();

  const { data: stays, isLoading: isLoadingStays } = useQuery({
    queryKey: ["stays", `last-${days}`],
    queryFn: () => getStaysAfterDate(startDate),
  });

  const completeStays = stays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );

  return { stays, isLoadingStays, completeStays };
}
