import styled, { css } from "styled-components";

const Input = styled.input`
  ${(props) =>
    props.styleinput === "default" &&
    css`
      background-color: var(--color-grey-300);
      font-style: normal;
      color: var(--color-silver-700);
      border-radius: 25px;
      padding: 20px 20px;
      margin: 10px 10px;
    `}

  ${(props) =>
    props.styleinput === "special" &&
    css`
      background-color: var(--color-indigo-700);
      font-style: italic;
      font-size: medium;
      border-radius: 30px;
      padding: 20px 10px;
      margin: 10px 10px;
    `}
`;

export default Input;
