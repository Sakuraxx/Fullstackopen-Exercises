import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS, ALL_GENRES } from './queries'

const NewBook = ({ show, setError, setNotification, token }) => {
  if (!show) {
    return null
  }

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  
  const [ addBook ] = useMutation(ADD_BOOK, {
      refetchQueries: [ { query:  ALL_BOOKS}, { query:  ALL_AUTHORS}, { query: ALL_GENRES } ],
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      onError: (error) => {
        const messages = error.graphQLErrors.length > 0
          ? error.graphQLErrors.map(e => e.message).join('\n')
          : error.message;
        setError(messages)
      },
      onCompleted: (data) => {
        const addedBookTitle = data.addBook.title;
        setNotification(`Successfully added book '${addedBookTitle}'`);
        setTitle('');
        setPublished('');
        setAuthor('');
        setGenres([]);
        setGenre('');
      }
    }
  )

  const submit = async (event) => {
    event.preventDefault()

    const variables = { title, author, published: parseInt(published) || 0, genres };
    console.log('Submitting variables:', variables);

    if (!title || !author || !published || genres.length === 0) {
      setError('Please ensure title, author, published year are filled and at least one genre is added.');
      return;
    }

    console.log('add book...')
    addBook({ variables });
  }

  const addGenre = () => {
    if (genre && !genres.includes(genre)) {
       setGenres(genres.concat(genre))
       setGenre('')
    }
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            required
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            required
          />
        </div>
        <div>
          published year
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
            required
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
            placeholder="add genre one by one"
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook