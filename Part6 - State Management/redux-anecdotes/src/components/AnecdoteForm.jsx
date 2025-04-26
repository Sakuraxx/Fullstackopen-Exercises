import { useDispatch } from 'react-redux'
import { createAnecdnote } from '../reducers/anecdoteReducer'
import { setTimedNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdnote(content))
        dispatch(setTimedNotification(`You added a new anecdote: '${content}'`, 5000))
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