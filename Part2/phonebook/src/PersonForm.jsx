import PersonService from "./PersonService";

const PersonForm = ({
  newName,
  setNewName,
  persons,
  setPersons,
  newNumber,
  setNewNumber,
}) => {
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

    PersonService.create(newPerson).then(data => {
      const newPersons = [...persons, data];
      setPersons(newPersons);
      setNewName("");
      setNewNumber("");
    });
  }

  function handleOnChangeName(event) {
    setNewName(event.target.value);
  }

  function handleOnChangeNumber(event) {
    setNewNumber(event.target.value);
  }

  return (
    <>
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
    </>
  );
};

export default PersonForm;
