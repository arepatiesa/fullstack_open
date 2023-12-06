import React from "react";

const Contact = ({ name, number }) => {
  return (
    <li>
      {name} {number}
    </li>
  );
};

const Persons = ({ persons, filtered, input }) => {

    if (input == "") {
      return (
        <ul>
          {persons.map((person) => (
            <Contact name={person.name} number={person.number} key={person.id} />
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
