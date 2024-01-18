import React from "react";

const Names = ({ list, handleShow }) => {
  return list.map((arr) => <div key={arr}>{arr} <button onClick={() => handleShow(arr)}>Show</button></div>);
};

const List = ({ countries, handleShow }) => {
  return (
    <div>
      {countries.length <= 10 ? (
        <Names list={countries} handleShow={handleShow}/>
      ) : (
        <div>Too many matches, specify another filter.</div>
      )}
    </div>
  );
};

export default List;
