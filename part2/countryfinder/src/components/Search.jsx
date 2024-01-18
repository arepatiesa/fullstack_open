import React from "react";

const Search = ({ handleChange, value }) => {
  return (
    <div>
      find countries <input type="text" onChange={handleChange} value={value} />
    </div>
  );
};

export default Search;
