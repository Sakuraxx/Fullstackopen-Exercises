import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  const shownPersons =
    filterName === ""
      ? persons
      : persons.filter((p) => p.name.includes(filterName));

  function checkIfExistSameNameInContact(name) {
    for (const person of persons) {
      if (name === person.name) {
        return true;
      }
    }
    return false;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (checkIfExistSameNameInContact(newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };
    const newPersons = [...persons, newPerson];
    setPersons(newPersons);
    setNewName("");
    setNewNumber("");
  }

  function handleOnChangeName(event) {
    setNewName(event.target.value);
  }

  function handleOnChangeNumber(event) {
    setNewNumber(event.target.value);
  }

  function handleOnChangeFilter(event) {
    setFilterName(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with{" "}
      <input value={filterName} onChange={handleOnChangeFilter} />
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleOnChangeName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleOnChangeNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {shownPersons.map((p, id) => (
          <li key={id}>
            {p.name} {p.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
