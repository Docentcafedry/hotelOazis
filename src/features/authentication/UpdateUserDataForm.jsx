import styled from "styled-components";
import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import Input from "../../ui/Input";

import { useGetUser } from "./hooks/useGetUser";
import { useForm } from "react-hook-form";
import { useUpdateUser } from "./hooks/useUpdateUser";

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

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useGetUser();
  const { register, formState, reset } = useForm();
  const { errors } = formState;
  const { updateUser, isLoadingUpdateUser } = useUpdateUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName) return;
    console.log(fullName, avatar);
    updateUser({ fullName, avatar }, { onSettled: () => reset() });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow>
        <Label htmlFor="email">Email address</Label>
        <Input
          type="email"
          id="email"
          value={email}
          disabled={email}
          {...register("email", {
            pattern: {
              value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              message: "Invalid email",
            },
          })}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="fullName">Full name</Label>
        <Input
          type="text"
          id="fullName"
          onChange={(e) => setFullName(e.target.value)}
          {...register("fullName", {
            required: "Full name field is required",
            minLength: {
              value: 8,
              message: "Full name field required at least 8 symbols",
            },
          })}
        />
        {errors.fullName ? <Error>{errors.fullName.message}</Error> : null}
      </FormRow>

      <FormRow>
        <Label htmlFor="avatar">Avatar image</Label>
        <FileInput
          id="avatar"
          type="file"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
        {errors.email ? <Error>{errors.email.message}</Error> : null}
      </FormRow>

      <FormRow>
        <Button type="reset" variation="secondary">
          Cancel
        </Button>
        <Button>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
