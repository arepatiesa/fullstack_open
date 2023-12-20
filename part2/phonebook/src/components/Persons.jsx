import React from "react";

const Contact = ({ name, number, handleDelete }) => {
  return (
    <li>
      {name} {number} <button type="button" onClick={handleDelete}>Delete</button>
    </li>
  );
};

const Persons = ({ persons, filtered, input, handleDelete }) => {

    if (input == "") {
      return (
        <ul>
          {persons.map((person) => (
            <Contact name={person.name} number={person.number} key={person.id} handleDelete={() => handleDelete(person.id, person.name)}/>
          ))}
        </ul>
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
