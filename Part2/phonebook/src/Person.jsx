import PersonService from "./PersonService";

const Person = ({ shownPersons, setPersons, persons }) => {
  const handleDeletePerson = id => {
    if (window.confirm("Do you really want to delete this person?")) {
      PersonService
      .del(id)
      .then(setPersons(persons.filter(p => p.id !== id)));
    }
  };

  return (
    <ul>
      {shownPersons.map((p, id) => (
        <li key={id}>
          {p.name} {p.number}
          <button onClick={() => handleDeletePerson(p.id)}>delete</button>
        </li>
      ))}
    </ul>
  );
};

export default Person;
