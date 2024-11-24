import { createSlice, current } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const newAnec = asObject(action.payload.content)
      state.push(newAnec)
      state.sort((a, b) => b.votes - a.votes);
      console.log("+", current(state))
    },
    vote(state, action) {
      const id = action.payload.id
      return state.map(anecdote =>
        anecdote.id === id
        ? {...anecdote, votes: anecdote.votes + 1}
        : anecdote
      ).sort((a, b) => b.votes - a.votes)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const { createAnecdote, vote, setAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer;