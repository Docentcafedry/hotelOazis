import styled from "styled-components";
import Header from "./Header";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import Logout from "../features/authentication/Logout";
import UserAvatar from "../features/authentication/UserAvatar";
import ToggleThemeMode from "./ToggleThemeMode";
import Row from "./Row";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header>
        <Row>
          <ToggleThemeMode />
          <Logout />
        </Row>
        <UserAvatar />
      </Header>
      <SideBar />
      <Main>
        <Outlet />
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
