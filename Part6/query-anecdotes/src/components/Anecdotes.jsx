import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from '../service/request'
import { useNotificationDispatch } from './NotificationContext'

const Anecdotes = () => {

    const queryClient = useQueryClient()

    const notificationDispatch = useNotificationDispatch()

    const updateNoteMutation = useMutation({
      mutationFn: updateAnecdote,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      },
    })

    const handleVote = (anecdote) => {
      updateNoteMutation.mutate({...anecdote, votes: anecdote.votes + 1 })
      notificationDispatch({type: 'VOTE', payload: anecdote.content})
      setTimeout(() => {
        notificationDispatch({type: 'CLEAR', payload: ''})
      }, 5000);
    }

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

    return (
        <div>
            {anecdotes.map(anecdote => (
            <div key={anecdote.id}>
                <div>
                {anecdote.content}
                </div>
                <div>
                has {anecdote.votes} votes
                <button onClick={() => handleVote(anecdote)}>Vote</button>
                </div>
            </div>
            ))}
        </div>
      )
}

export default Anecdotes