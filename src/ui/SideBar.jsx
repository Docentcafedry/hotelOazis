import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";

const StyledSideBar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: var(--color-grey-100);
  padding: 3.2rem 2.8rem;
  grid-row: 1 / -1;
  border-right: 1px solid var(--color-grey-400);
`;

function SideBar() {
  return (
    <StyledSideBar>
      <Logo />
      <MainNav />
    </StyledSideBar>
  );
}

export default SideBar;
