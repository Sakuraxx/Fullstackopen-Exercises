import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../service/request'
import { useNotificationDispatch } from './NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const notificationDispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    },
    onError: (err) => {
      notificationDispatch({type: 'ERROR', payload: err.response.data.error})
      setTimeout(() => {
        notificationDispatch({type: 'CLEAR', payload: ''})
      }, 5000);
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote',  content)
    newAnecdoteMutation.mutate({ content, votes: 0 })

    notificationDispatch({type: 'ADD', payload: content})
    setTimeout(() => {
      notificationDispatch({type: 'CLEAR', payload: ''})
    }, 5000);
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
