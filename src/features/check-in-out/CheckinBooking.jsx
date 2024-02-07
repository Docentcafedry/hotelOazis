import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import { useState, useEffect } from "react";
import { useCheckin } from "./useCheckin";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const {
    data: {
      breakfastPrice,
      maxBookingLength,
      maxGuestPerBooking,
      minBookingLength,
    } = {},
    isLoading: isLoadingSettings,
  } = useQuery({ queryKey: ["settings"], queryFn: getSettings });
  const { data, isError, isLoading } = useBooking();
  const [allowPay, setAllowPay] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const { checkIn, isCheckInLoading } = useCheckin();
  const moveBack = useMoveBack();

  useEffect(() => setAllowPay(data?.isPaid ?? false), [data]);

  if (isLoading) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numberOfNights,
    isPaid,
  } = data;
  const additionalPrice = breakfastPrice * numGuests;

  function handleCheckin() {
    if (!allowPay) return;
    console.log("from handler");
    checkIn({
      bookingId,
      updatedValues: {
        isPaid: true,
      },
    });
  }

  console.log(isPaid);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox
        booking={data}
        allowPay={allowPay}
        checkBoxChange={() => setAllowPay(!allowPay)}
        breakfast={breakfast}
        setBreakfast={() => setBreakfast(!breakfast)}
      />

      <ButtonGroup>
        <Button
          onClick={handleCheckin}
          disabled={!allowPay}
          variation="primary"
        >
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
