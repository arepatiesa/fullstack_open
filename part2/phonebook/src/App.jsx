import React, { useState, useEffect } from "react";
import _, { indexOf } from "lodash";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import phoneService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [id, setId] = useState(0)

  useEffect(() => {
    phoneService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addContact = (event) => {
    event.preventDefault();
    const contactObject = {
      name: newName,
      number: newNumber,
      id: id + 1
    };

    const resultName = persons.some((obj) => {
      return _.isEqual(newName, obj.name);
    });
    const resultNumber = persons.some((obj) => {
      return _.isEqual(newNumber, obj.number);
    });

     if (resultName == true && resultNumber != true) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const number = persons.find(res => res.name == newName)
        const changedNumber = {...number, number: newNumber}
        phoneService.update(number.id, changedNumber)
        .then(res => setPersons(persons.map(num => num.id !== number.id ? num : res.data)))
        setNewName("");
        setNewNumber("");
      }
      return 
    } else if (resultName != true && resultNumber == true) {
      alert(`${newNumber} is already added to the phonebook`);
    } else if (resultName == true && resultNumber == true) {
      alert(`${newNumber} is already added to the phonebook`);
    }
    else if (resultName != true && resultNumber != true) {
      phoneService.create(contactObject);
      setPersons(persons.concat(contactObject));
      setId(id + 1)
      setNewName("");
      setNewNumber("");
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

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      phoneService.deleteNumber(id);
      const array = persons.findIndex((person) => person.id === id);
      setPersons(persons.filter((person) => persons.indexOf(person) != array));
    }

    return;
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

      <Persons
        persons={persons}
        filtered={filtered}
        input={filter}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
