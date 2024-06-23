import PersonService from "./PersonService";
import { notifyNormalMsg, notifyErrMsg } from "./Notification";

const Person = ({
  shownPersons,
  setPersons,
  persons,
  setNormalMsg,
  setErrMsg,
}) => {
  const handleDeletePerson = (delPerson) => {
    if (window.confirm("Do you really want to delete this person?")) {
      let id = delPerson.id;
      PersonService.del(id)
        .then((res) => {
          setPersons(persons.filter((p) => p.id !== id));
          notifyNormalMsg(`Deleted ${delPerson.name}`, setNormalMsg);
        })
        .catch((err) => {
          notifyErrMsg(`Deleted ${delPerson.name} failed. ${err}`, setErrMsg);
        });
    }
  };

  return (
    <ul>
      {shownPersons.map((p, id) => (
        <li key={id}>
          {p.name} {p.number}
          <button onClick={() => handleDeletePerson(p)}>delete</button>
        </li>
      ))}
    </ul>
  );
};

export default Person;
