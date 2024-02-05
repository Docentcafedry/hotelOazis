import Row from "../../ui/Row";
import Filter from "../../ui/Filter";
import Sort from "../../ui/Sort";
import TableOperations from "../../ui/TableOperations";

function CabinsOperations() {
  return (
    <Row>
      <TableOperations>
        <Filter
          filterField={"filter"}
          options={[
            { value: "all", label: "All" },
            { value: "price", label: "Price" },
            { value: "discount", label: "Discount" },
            { value: "capacity", label: "Capacity" },
          ]}
        />
        <Sort
          options={[
            { value: "name-asc", label: "Name (A-Z)" },
            { value: "name-desc", label: "Name (Z-A)" },
            { value: "maxCapacity-asc", label: "Capacity (A-Z)" },
            { value: "maxCapacity-desc", label: "Capacity (Z-A)" },
            { value: "regularPrice-asc", label: "Price (A-Z)" },
            { value: "regularPrice-desc", label: "Price (Z-A" },
          ]}
          sortParam="sortBy"
        ></Sort>
      </TableOperations>
    </Row>
  );
}

export default CabinsOperations;
