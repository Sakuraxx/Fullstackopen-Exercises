import { useQuery, useMutation  } from '@apollo/client'
import Select from 'react-select'
import { useState } from "react";
import { ALL_AUTHORS, Edit_AUTHOR } from './queries'

const Authors = ({show, setError}) => {
  if (!show) {
    return null
  }

  const [selectedOption, setSelectedOption] = useState(null);
  const [birth, setBirth] = useState('')
  
  const result = useQuery(ALL_AUTHORS)
  const [ editAuthor ] = useMutation(Edit_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      setError(messages)
    }
  })

  console.log('author', result)

  if (result.loading || result.data === undefined) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthor
  const options = authors.map(author => ({
    value: author.name,
    label: author.name
  }));


  const updateBirthYear = async (event) => {
    event.preventDefault()

    editAuthor({ variables: { name: selectedOption.value, birth: parseInt(birth) } })

    setBirth('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      <form onSubmit={updateBirthYear}>  
        <div>
          Name:<Select options={options} onChange={setSelectedOption}/>
        </div>
        <div>
            Born:
            <input
              value={birth}
              onChange={({ target }) => setBirth(target.value)}
            />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
