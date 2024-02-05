import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function Sort({ options, sortParam }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get(sortParam) || "";

  function handleOnChange(e) {
    searchParams.set(sortParam, e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      onChange={handleOnChange}
      value={sortBy}
      type="white"
    ></Select>
  );
}

export default Sort;
