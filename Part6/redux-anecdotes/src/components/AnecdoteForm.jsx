import { useDispatch } from 'react-redux'
import anecdotesService from '../service/anecdotes'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''

        const newAnecdote = await anecdotesService.createNew(content)
        dispatch(createAnecdote(newAnecdote))
        dispatch({ type: 'notification/setNotification', payload: `You added a new anecdote: '${content}'`})
    }

    return (
        <>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
            <div><input name='anecdote'/></div>
            <button type='submit'>create</button>
        </form>
        </>
    )
}

export default AnecdoteForm