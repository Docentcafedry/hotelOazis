import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import { useState } from "react";
import Button from "../ui/Button";

function Cabins() {
  const [isActiveCreationForm, setActiveCreationForm] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter</p>
      </Row>

      <CabinTable />
      <Button
        onClick={() => setActiveCreationForm(!isActiveCreationForm)}
        variation="primary"
        size="large"
      >
        {!isActiveCreationForm ? "Create cabin" : "Close form"}
      </Button>

      {isActiveCreationForm && <CreateCabinForm />}
    </>
  );
}

export default Cabins;
