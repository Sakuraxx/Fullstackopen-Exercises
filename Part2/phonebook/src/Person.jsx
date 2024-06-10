const Person = ({ shownPersons }) => {
  return (
    <ul>
      {shownPersons.map((p, id) => (
        <li key={id}>
          {p.name} {p.number}
        </li>
      ))}
    </ul>
  );
};

export default Person;
