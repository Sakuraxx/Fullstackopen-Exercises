import { useState, useEffect } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Person from "./Person";
import PersonService from "./PersonService";
import { Notification } from "./Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [normalMsg, setNormalMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const shownPersons =
    filterName === ""
      ? persons
      : persons.filter((p) => p.name.includes(filterName));

  useEffect(() => {
    PersonService.getAll().then((data) => setPersons(data));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification normalMsg={normalMsg} errMsg={errMsg}></Notification>
      <Filter filterName={filterName} setFilterName={setFilterName} />
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        persons={persons}
        setPersons={setPersons}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        setNormalMsg={setNormalMsg}
        setErrMsg={setErrMsg}
      />
      <h2>Numbers</h2>
      <Person
        shownPersons={shownPersons}
        setPersons={setPersons}
        persons={persons}
        setNormalMsg={setNormalMsg}
        setErrMsg={setErrMsg}
      />
    </div>
  );
};

export default App;
