import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import { useState } from "react";
import Button from "../ui/Button";
import AddCabin from "../ui/AddCabin";
import CabinsOperations from "../features/cabins/CabinsOperations";

function Cabins() {
  return (
    <>
      <Row>
        <Heading as="h1">All cabins</Heading>
        <Row>
          <CabinsOperations />
        </Row>
      </Row>

      <CabinTable />
      <AddCabin />
    </>
  );
}

export default Cabins;
