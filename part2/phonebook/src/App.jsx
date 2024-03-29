import React, { useState, useEffect } from "react";
import _, { indexOf, set } from "lodash";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import phoneService from "./services/persons";
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [id, setId] = useState(0);

  useEffect(() => {
    phoneService.getAll().then((response) => {
      setPersons(response.data);
      response.data.map((res) => setId(res.id));
    });
  }, []);

  // Displays Messages on the top of the app
  const Notification = ({message, style}) => {
    if (message === null) {
      return null
    }

    return (
      <div className={style}>
        {message}
      </div>
    )
  }

  const addContact = (event) => {
    event.preventDefault();
    const contactObject = {
      name: newName,
      number: newNumber,
      id: id + 1,
    };

    // This checks if the name of number is already added to the phonebook
    const resultName = persons.some((obj) => {
      return _.isEqual(newName, obj.name);
    });
    const resultNumber = persons.some((obj) => {
      return _.isEqual(newNumber, obj.number);
    });

    if (resultName == true && resultNumber != true) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) // REPLACE numbers 
      {
        const number = persons.find((res) => res.name == newName);
        const changedNumber = { ...number, number: newNumber };

        // Backend PUT service
        phoneService
          .update(number.id, changedNumber)
          .then((res) =>
            setPersons(
              persons.map((num) => (num.id !== number.id ? num : res.data))
            )
          )
          .catch(error => {
            setErrorMessage(`Information of ${contactObject.name} has already been removed from the server`)
            setSuccessMessage(null)
            setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          })

        setNewName("");
        setNewNumber("");
        setSuccessMessage(`Replaced ${contactObject.name} number.`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      }
      return;
    } else if (resultName != true && resultNumber == true) {
      alert(`${newNumber} is already added to the phonebook`);
    } else if (resultName == true && resultNumber == true) {
      alert(`${newNumber} is already added to the phonebook`);
    } 
    // ADD new numbers 
    else if (resultName != true && resultNumber != true) {
      // Add backend service
      phoneService.create(contactObject)
        .then(createdPerson => {
          setPersons(persons.concat(contactObject));
          setSuccessMessage(`Added ${contactObject.name}.`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
      setNewName("");
      setNewNumber("");
    }
  };

  // This generates an array of the phone numbers that match the text 
  /// inside of the "filter shown with" search bar
  const filtered = persons.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  // These are the event handlers

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

  // I mean, this is called "handleDelete" but it is not an event handler. 
  // It is the function that deletes numbers from the server and state

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      phoneService.deleteNumber(id);
      const array = persons.findIndex((person) => person.id === id);
      setPersons(persons.filter((person) => persons.indexOf(person) != array));  
    }
    else {
      return;
    }
  };


  return (
    <div>
      <h2>Phonebook ☎️</h2>
      <Notification message={successMessage} style="success"/>
      <Notification message={errorMessage} style="error"/>
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
      <p>Number example: xxx-xxxxxx</p>

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
