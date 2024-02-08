import styled, { css } from "styled-components";

const StyledRowVertical = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  margin-top: 5px;
  ${(props) =>
    props.type === "horizontal" &&
    css`
      align-items: center;
      justify-content: space-between;
    `}
  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

const Label = styled.label`
  font-weight: 500;
  text-align: center;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function FormRowVertical({ label, error, children }) {
  return (
    <StyledRowVertical>
      {label && <Label htmlFor={children.props.id}>{label}</Label>} {children}
    </StyledRowVertical>
  );
}

export default FormRowVertical;
