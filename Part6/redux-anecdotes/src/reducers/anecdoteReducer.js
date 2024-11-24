import { createSlice, current } from '@reduxjs/toolkit'
import anecdotesService from '../service/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
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

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}