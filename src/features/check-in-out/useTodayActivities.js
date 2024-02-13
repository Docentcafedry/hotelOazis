import { getStaysTodayActivity } from "../../services/apiBookings";
import { useQuery } from "@tanstack/react-query";

export function useTodayActivities() {
  const { data: activities, isLoadingActivities } = useQuery({
    queryKey: ["activities"],
    queryFn: () => getStaysTodayActivity(),
  });

  return { activities, isLoadingActivities };
}
