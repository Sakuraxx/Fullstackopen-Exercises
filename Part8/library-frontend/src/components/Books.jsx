import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES } from './queries'
import { useState } from 'react'

const Books = (props) => {
  if (!props.show) {
    return null
  }

  const [selectedGenre, setSelectedGenre] = useState(null);

  // Query 1: Fetch all unique genres for the buttons
  const { loading: genresLoading, error: genresError, data: genresData } = useQuery(ALL_GENRES);

  // Query 2: Fetch books, filtered by the selected genre
  const { loading: booksLoading, error: booksError, data: booksData } = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre },
  });

  // Combine loading states
  if (genresLoading || booksLoading) {
    return <div>loading...</div>;
  }

  // Combine error states (or display them separately)
  if (genresError || booksError) {
    return <p>Error loading data: {genresError?.message || booksError?.message}</p>;
  }

  // Get genres from the dedicated query
  const allGenres = genresData?.allGenres || [];
  // Get books from the potentially filtered query
  const books = booksData?.allBooks || [];

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
          {books?.map((a) => (
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
