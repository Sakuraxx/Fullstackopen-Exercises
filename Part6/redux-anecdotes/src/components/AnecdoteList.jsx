import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {
    const anecdotes = useSelector(({anecdotes, filter}) => {
      if(filter == '') {
        return anecdotes;
      }
      console.log(anecdotes, filter)
      return anecdotes.filter(anecdote => anecdote.content.includes(filter));
    })

    const dispatch = useDispatch()

    const vote = (id) => {
        console.log('vote', id)
        dispatch({ type: 'anecdotes/vote', payload: {id} })
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
                <button onClick={() => vote(anecdote.id)}>vote</button>
              </div>
            </div>
          )}
        </>
    )
}

export default AnecdoteList