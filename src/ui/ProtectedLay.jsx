import styled, { css } from "styled-components";
import Spinner from "../ui/Spinner";
import { useGetUser } from "../features/authentication/hooks/useGetUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Lay = styled.div`
  height: 100vh;
  background-color: var(--color-gray-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedLay({ children }) {
  const navigator = useNavigate();
  const { user, isLoading } = useGetUser();

  useEffect(
    function () {
      if (!user && !isLoading) {
        navigator("/login");
      }
    },
    [user, isLoading, navigator]
  );

  if (isLoading)
    return (
      <Lay>
        <Spinner />
      </Lay>
    );

  console.log(user);

  return children;
}

export default ProtectedLay;
