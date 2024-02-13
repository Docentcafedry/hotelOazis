import styled from "styled-components";
import { Flag } from "../../ui/Flag";
import { HiUsers } from "react-icons/hi2";
import Button from "../../ui/Button";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ activity }) {
  return (
    <StyledTodayItem>
      <Guest>{activity?.guests?.fullName}</Guest>
      <Flag
        src={activity?.guests?.countryFlag}
        alt={`${activity.id}-flag`}
      ></Flag>
      <Guest>{activity?.guests?.nationality}</Guest>
      <Guest>
        <HiUsers />
        <span>{activity.numGuests}</span>
      </Guest>
      {activity.status === "uncorfirmed" && (
        <Button size="small" variation="primary">
          Check in
        </Button>
      )}
      {activity.status === "checked-in" && (
        <Button size="small" variation="primary">
          Check out
        </Button>
      )}
    </StyledTodayItem>
  );
}

export default TodayItem;
