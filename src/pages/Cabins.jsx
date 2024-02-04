import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import { useState } from "react";
import Button from "../ui/Button";
import AddCabin from "../ui/AddCabin";
import Filter from "../ui/Filter";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <Filter
          filterField={"filter"}
          options={[
            { value: "all", label: "All" },
            { value: "price", label: "Price" },
            { value: "discount", labe: "Discount" },
            { value: "capacity", label: "Capacity" },
          ]}
        />
      </Row>

      <CabinTable />
      <AddCabin />
    </>
  );
}

export default Cabins;
