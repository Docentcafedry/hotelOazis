import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useLogin } from "./hooks/useLogin";
import { useNavigate } from "react-router-dom";
// import { login } from "../../services/apiAuth";

function LoginForm() {
  const navigator = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoadingLogin } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) console.log(email, password);
    console.log("submit");
    login({ email, password }, { onSuccess: () => navigator("/dashboard") });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          styleinput="default"
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          styleinput={"default"}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" variation="primary">
          Login
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
