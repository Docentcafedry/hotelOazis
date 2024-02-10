import styled from "styled-components";

import Input from "../ui/Input";
import Form from "../ui/Form";
import Button from "../ui/Button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useSignUp } from "../features/authentication/hooks/useSignup";
import { useNavigate } from "react-router-dom";

export const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

export const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateUserForm() {
  const { signUp, isLoadingSignUp } = useSignUp();
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { register, formState, reset, handleSubmit, getValues } = useForm();
  const { errors } = formState;
  const navigator = useNavigate();

  function onSubmit({ fullName, email, password }) {
    console.log(fullName, email, password);
    signUp({ fullName, email, password }, { onSettled: () => reset() });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          {...register("email", {
            required: "Email field is required",
            pattern: {
              value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              message: "Invalid email",
            },
          })}
        />
        {errors.email ? <Error>{errors.email.message}</Error> : null}
      </FormRow>

      <FormRow>
        <Label htmlFor="fullName">Full name</Label>
        <Input
          type="text"
          id="fullName"
          onChange={(e) => setFullName(e.target.value)}
          {...register("fullName", {
            required: "Full name field is required",
            minLength: { value: 6, message: "Minimum length is 6 symbols" },
          })}
        />
        {errors.fullName ? <Error>{errors.fullName.message}</Error> : null}
      </FormRow>

      <FormRow>
        <Label htmlFor="passsword">Password</Label>
        <Input
          type="password"
          id="passsword"
          onChange={(e) => setPassword(e.target.value)}
          {...register("password", {
            required: "Password field is required",
            minLength: {
              value: 8,
              message: "Password must consist of at least 8 symbols",
            },
          })}
        />
        {errors.password ? <Error>{errors.password.message}</Error> : null}
      </FormRow>

      <FormRow>
        <Label htmlFor="repeatPassword">Repeat password</Label>
        <Input
          type="password"
          id="repeatPassword"
          {...register("repeatePassword", {
            required: "You must repeat password",
            validate: (value) =>
              value === getValues().password || "Passwords didn't matched",
          })}
        />
        {errors.repeatePasswrod ? (
          <Error>{errors.repeatePasswrod.message}</Error>
        ) : null}
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => navigator("/dashboard")}
        >
          Cancel
        </Button>
        <Button>Create user</Button>
      </FormRow>
    </Form>
  );
}

export default CreateUserForm;
