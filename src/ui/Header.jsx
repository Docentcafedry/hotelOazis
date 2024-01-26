import styled, { css } from "styled-components";

const Header = styled.h1`
  ${(props) =>
    props.type === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.type === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 400;
    `}

    ${(props) =>
    props.style === "h3" &&
    css`
      font-size: 1rem;
      font-weight: 200;
    `}
`;

export default Header;
