import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from './queries'
import { useState } from 'react'

const Books = (props) => {
  if (!props.show) {
    return null
  }

  const [selectedGenre, setSelectedGenre] = useState(null); // null means 'all genres' initially

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

  const allGenres = books?.reduce((genres, book) => {
    book?.genres.forEach(genre => {
      if (!genres.includes(genre)) {
        genres.push(genre)
      }
      })
    return genres
  }, []) 

  const filterBooks = selectedGenre ?
    books?.filter(book => book.genres.includes(selectedGenre)) :
    books

  return (
    <div>
      <h2>books</h2>

      {/* Book Table*/}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filterBooks?.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Genre Filter */}
      <div>
        {allGenres?.map(genre => (
          <button onClick={() => setSelectedGenre(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => setSelectedGenre(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books
