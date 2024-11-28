import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery } from '@tanstack/react-query'
import { getAnecdotes } from './service/request'

const App = () => {

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 2
  })

  if (isPending) {
    return <div>loading data...</div>
  }

  if (isError) {
    return <span>anecdote service not available due to {error.message}</span>
  }

  const anecdotes = data

  const handleVote = (anecdote) => {
    console.log('vote')
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
