import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
    const anecdotes = useSelector(({anecdotes, filter}) => {
      if(filter == '') {
        return anecdotes;
      }
      console.log(anecdotes, filter)
      return anecdotes.filter(anecdote => anecdote.content.includes(filter));
    })

    const dispatch = useDispatch()

    const vote = (id, content) => {
        console.log('vote', id)
        dispatch(voteAnecdote(id))
        dispatch({ type: 'notification/setNotification', payload: `You voted : '${content}'`})
    }

    return (
        <>
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
              </div>
            </div>
          )}
        </>
    )
}

export default AnecdoteList