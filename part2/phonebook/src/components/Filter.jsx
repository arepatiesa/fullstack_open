import React from "react";

const Filter = ({
  handleFilter,
  valueFilter,
}) => {

  return (
    <div>
      filter shown with: <input onChange={handleFilter} value={valueFilter} />
    </div>
  );
};

export default Filter;
