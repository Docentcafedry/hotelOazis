import styled from "styled-components";
import CabinRow from "./CabinRow";
import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import { useSearchParams } from "react-router-dom";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

export default function CabinTable() {
  const {
    data: cabins,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["cabins"], queryFn: getCabins });

  const [searchParamsm] = useSearchParams();

  const filterValue = searchParamsm.get("filter") || "all";

  let filteredCabins;

  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "price")
    filteredCabins = cabins?.filter((cabin) => cabin.regularPrice > 0);

  if (filterValue === "capacity")
    filteredCabins = cabins?.filter((cabin) => cabin.maxCapacity > 0);

  if (filterValue === "discount")
    filteredCabins = cabins?.filter((cabin) => cabin.discount > 0);

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Name</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={filteredCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        ></Table.Body>
      </Table>
    </Menus>
  );
}
