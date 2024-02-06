import styled from "styled-components";
import { IoArrowBack } from "react-icons/io5";
import { IoArrowForward } from "react-icons/io5";
import { PAGE_SIZE } from "../utils/globalVars";
import { useSearchParams } from "react-router-dom";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 2rem;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  const numberOfPages = Math.ceil(count / PAGE_SIZE);

  function handleNext() {
    const next = !(page < numberOfPages) ? page : page + 1;
    searchParams.set("page", next);
    setSearchParams(searchParams);
  }

  function handlePrev() {
    const prev = page > 1 ? page - 1 : page;
    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }

  return (
    <StyledPagination>
      <P>
        <span>{(page - 1) * PAGE_SIZE} </span>
        <span>to </span>
        <span>
          {page * PAGE_SIZE - 1 < count ? page * PAGE_SIZE - 1 : count}{" "}
        </span>
        <span>of </span>
        <span>{count}</span>
      </P>

      <Buttons>
        <PaginationButton onClick={handlePrev}>
          <IoArrowBack />
          <span>Previous</span>
        </PaginationButton>
        <PaginationButton onClick={handleNext}>
          <IoArrowForward />
          <span>Next</span>
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
