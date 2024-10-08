import PersonService from "./PersonService";
import { notifyNormalMsg, notifyErrMsg } from "./Notification";

const PersonForm = ({
  newName,
  setNewName,
  persons,
  setPersons,
  newNumber,
  setNewNumber,
  setNormalMsg,
  setErrMsg,
}) => {
  const newPerson = {
    name: newName,
    number: newNumber,
  };

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
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`,
        )
      ) {
        let updateId = persons.filter((person) => person.name === newName)[0]
          .id;
        PersonService.update(updateId, newPerson)
          .then((updatePerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== updateId ? person : updatePerson,
              ),
            );
            setNewName("");
            setNewNumber("");
          })
          .catch((err) => {
            notifyErrMsg(
              `Updated ${newName} failed. ${err.response.data.error}`,
              setErrMsg,
            );
          });

        notifyNormalMsg(`Updated ${newName}`, setNormalMsg);
      }

      return;
    }

    PersonService.create(newPerson)
      .then((data) => {
        const newPersons = [...persons, data];
        setPersons(newPersons);
        setNewName("");
        setNewNumber("");

        notifyNormalMsg(`Created ${newName}`, setNormalMsg);
      })
      .catch((err) => {
        notifyErrMsg(
          `Created ${newName} failed. ${err.response.data.error}`,
          setErrMsg,
        );
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
