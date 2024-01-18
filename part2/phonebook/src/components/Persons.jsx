import React from "react";

const Contact = ({ name, number, handleDelete }) => {
  return (
      <div>{name} {number} <button type="button" onClick={handleDelete}>Delete</button></div>
  );
};

const Persons = ({ persons, filtered, input, handleDelete }) => {

    if (input == "") {
      return (
        <div>
          {persons.map((person) => (
            <Contact name={person.name} number={person.number} key={person.id} handleDelete={() => handleDelete(person.id, person.name)}/>
          ))}
        </div>
      );
    } else {
      return (
        <ul>
          {filtered.map((person) => (
            <Contact name={person.name} number={person.number} key={person.id} />
          ))}
        </ul>
      );
    }
  };


export default Persons;
