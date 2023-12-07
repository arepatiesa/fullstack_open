import React, { useState, useEffect } from "react";
import _ from "lodash";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
      setPersons(response.data)
    })
  }, [])

  const addContact = (event) => {
    event.preventDefault();
    const contactObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    const resultName = persons.some((obj) => {
      return _.isEqual(newName, obj.name);
    });
    const resultNumber = persons.some((obj) => {
      return _.isEqual(newNumber, obj.number);
    });

    if (resultName != true && resultNumber != true) {
      setPersons(persons.concat(contactObject));
      setNewName("");
      setNewNumber("");
    } else if (resultName == true && resultNumber != true) {
      alert(`${newName} is already added to the phonebook`);
    } else if (resultNumber == true && resultName != true) {
      alert(`${newNumber} is already added to the phonebook`);
    } else {
      alert(`${newName} ${newNumber} is already added to the phonebook`);
    }
  };

  const filtered = persons.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setFilteredContacts(filtered);
  };

  return (
    <div>
      <h2>Phonebook ☎️</h2>
      <Filter handleFilter={handleFilterChange} valueFilter={filter} />
      <h2>Add a new 📱</h2>
      <PersonForm
        submitEvent={addContact}
        handleName={handleNameChange}
        handleNumber={handleNumberChange}
        valueName={newName}
        valueNumber={newNumber}
      />
      <h2>Numbers 📞</h2>

      <Persons persons={persons} filtered={filtered} input={filter}/>
      
    </div>
  );
};

export default App;
