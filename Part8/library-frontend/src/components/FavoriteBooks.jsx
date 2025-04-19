import { useQuery } from '@apollo/client'
import { ALL_BOOKS, CURRENT_USER } from './queries' 

const FavoriteBooks = ({ show, token }) => { 
  if (!show) {
    return null
  }

  const { loading: userLoading, error: userError, data: userData } = useQuery(CURRENT_USER, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
        fetchPolicy: 'cache-and-network'
      }
    }
  })

  console.log('[favorite books] current user', userData)

  const favoriteGenre = userData?.me?.favoriteGenre;
  
  const { loading: booksLoading, error: booksError, data: booksData } = useQuery(ALL_BOOKS, {
    variables: { genre: favoriteGenre },
    skip: !favoriteGenre, 
  })

  if (userLoading || booksLoading) {
    return <div>loading...</div>
  }

  if (userError) {
    return <p>Error loading user data: {userError.message}</p>
  }

  if (booksError) {
    return <p>Error loading books: {booksError.message}</p>
  }

  const books = booksData?.allBooks || []

  console.log('[recommendations] books', books)

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <b>{favoriteGenre}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th>title</th>
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

export default FavoriteBooks

