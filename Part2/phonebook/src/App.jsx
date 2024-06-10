import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  function handleSubmit(event) {
    event.preventDefault();
    const newPerson = {
      name: newName
    }
    const newPersons = [...persons, newPerson];
    setPersons(newPersons);
    setNewName('');
  }

  function handleOnChange(event) {
    console.log('onchange', event.target.value);
    setNewName(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleOnChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
        </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((p, key) => <li key={key}>{p.name}</li>)}
      </ul>
    </div>
  )
}

export default App