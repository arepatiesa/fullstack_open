import React from "react";

const Names = ({ list }) => {
  return list.map((arr) => <div key={arr}>{arr}</div>);
};

const List = ({ countries }) => {
  return (
    <div>
      {countries.length <= 10 ? (
        <Names list={countries} />
      ) : (
        <div>Too many matches, specify another filter.</div>
      )}
    </div>
  );
};

export default List;
