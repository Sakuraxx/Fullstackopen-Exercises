import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from './queries'

const Books = (props) => {
  if (!props.show) {
    return null
  }

  const {loading, error, data} = useQuery(ALL_BOOKS, {
    variables: {genre: ""},
  })

  console.log('books', data)

  if(loading) {
    return <div>loading...</div>
  }

  if (error) {
    return <p>Error loading books: {error.message}</p>;
  }

  const books = data?.allBooks || [];

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
