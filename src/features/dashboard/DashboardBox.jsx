import styled from "styled-components";
import Stat from "./Stat";
import { MdOutlineBedroomChild } from "react-icons/md";
import { AiOutlineDollar } from "react-icons/ai";
import { formatCurrency } from "../../utils/helpers";
import { GiConfirmed } from "react-icons/gi";
import { GrCapacity } from "react-icons/gr";

const DashboardBoxStyled = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;

  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

function DashboardBox({ bookings, confirmedSales, days, cabins }) {
  const bookingdNum = bookings?.length;
  const sales = bookings?.reduce((prev, cur) => cur.totalPrice + prev, 0);
  const numSales = confirmedSales?.length;
  const occupancy =
    confirmedSales?.reduce((prev, cur) => cur.numberOfNights + prev, 0) /
    (cabins * days);
  return (
    <>
      <Stat
        icon={<MdOutlineBedroomChild />}
        title="Bookings"
        value={bookingdNum}
        color="blue"
      ></Stat>
      <Stat
        icon={<AiOutlineDollar />}
        title="Sales"
        value={formatCurrency(sales)}
        color="green"
      ></Stat>
      <Stat
        icon={<GiConfirmed />}
        title="Stays"
        value={numSales}
        color="blue"
      ></Stat>
      <Stat
        icon={<GrCapacity />}
        title="Occupancy"
        value={`${Math.ceil(occupancy)}%`}
        color="yellow"
      ></Stat>
    </>
  );
}

export default DashboardBox;
