import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useNavigate } from "react-router-dom";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import { RiHotelLine } from "react-icons/ri";
import { FaCircleCheck } from "react-icons/fa6";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const navigator = useNavigate();

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Menus.Menu>
        <Menus.Toggle menuId={bookingId}></Menus.Toggle>
        <Menus.MenuList menuId={bookingId}>
          <Menus.Button onClick={() => navigator(`/bookings/${bookingId}`)}>
            <RiHotelLine />
          </Menus.Button>

          {status !== "checked-in" && (
            <Menus.Button
              onClick={() => navigator(`/bookings/check/${bookingId}`)}
            >
              <FaCircleCheck />
            </Menus.Button>
          )}
        </Menus.MenuList>
      </Menus.Menu>
    </Table.Row>
  );
}

export default BookingRow;
