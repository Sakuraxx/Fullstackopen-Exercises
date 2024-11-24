import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/AnecdoteFilter'
import Notification from './components/Notification'
import { useEffect } from 'react'
import anecdotesService from './service/anecdotes'
import { useDispatch } from 'react-redux'
import { setAnecdotes } from './reducers/anecdoteReducer'

const App = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    anecdotesService.getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
  }, [])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter/>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App