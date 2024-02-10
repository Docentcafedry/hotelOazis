import Heading from "../ui/Heading";
import CreateUserForm from "../ui/CreateUserForm";

function NewUsers() {
  return (
    <>
      <Heading as="h1">Create a new user</Heading>
      <CreateUserForm />
    </>
  );
}

export default NewUsers;
