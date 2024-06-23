import { useState, useEffect } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Person from "./Person";
import axios from 'axios';
import PersonService from "./PersonService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  const shownPersons =
    filterName === ""
      ? persons
      : persons.filter((p) => p.name.includes(filterName));

  useEffect(() => {
    PersonService.getAll().then(data => setPersons(data))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} setFilterName={setFilterName} />
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        persons={persons}
        setPersons={setPersons}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Person shownPersons={shownPersons} />
    </div>
  );
};

export default App;
