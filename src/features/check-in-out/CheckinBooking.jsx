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
import { useCheckout } from "./useCheckout";

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
  const { checkOut, isCheckOutLoading } = useCheckout();
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
    extrasPrice,
  } = data;
  const additionalPrice = breakfastPrice * numGuests;

  function handleCheckin() {
    if (!allowPay) return;
    else if (breakfast) {
      console.log("with breakfast");
      checkOut({
        bookingId,
        updatedValues: { status: "checked-out", isPaid: false },
      });
      checkIn({
        bookingId,
        updatedValues: {
          status: "checked-in",
          isPaid: true,
          extrasPrice: additionalPrice,
          totalPrice: totalPrice + additionalPrice,
          hasBreakfast: true,
        },
      });
    }
    if (!breakfast) {
      console.log("without breakfast");
      checkIn({
        bookingId,
        updatedValues: { status: "checked-in", isPaid: true },
      });
    }
  }

  console.log(allowPay);
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
        extrasPrice={additionalPrice}
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
