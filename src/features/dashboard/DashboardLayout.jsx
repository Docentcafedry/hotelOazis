import styled from "styled-components";
import Heading from "../../ui/Heading";
import DashboardBox from "./DashboardBox";
import { useRecentBookings } from "./hooks/useRecentBookings";
import { useRecentStays } from "./hooks/useRecentStays";
import Spinner from "../../ui/Spinner";
import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import SalesCharts from "./SalesChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { data: cabins, isLoadingCabins } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
  const { bookings, isLoading, days } = useRecentBookings();
  const { stays, isLoadingStays, completeStays } = useRecentStays();
  if (isLoading || isLoadingStays || isLoadingCabins) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <DashboardBox
        bookings={bookings}
        confirmedSales={completeStays}
        days={days}
        cabins={cabins.length}
      />
      <div>Todays activity</div>
      <div>Chart stay duration</div>
      <SalesCharts bookings={bookings} days={days} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
