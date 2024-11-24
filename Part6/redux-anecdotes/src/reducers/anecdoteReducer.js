import { createSlice} from '@reduxjs/toolkit'
import anecdotesService from '../service/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      const id = action.payload.id
      const res =  state.map(anecdote =>
        anecdote.id === id
        ? {...action.payload}
        : anecdote
      ).sort((a, b) => b.votes - a.votes)
      console.log(res)
      return res
    },
    setAnecdotes(state, action) {
      return action.payload.sort((a, b) => b.votes - a.votes)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
  },
})

export const {vote, setAnecdotes, appendAnecdote} = anecdoteSlice.actions
export default anecdoteSlice.reducer;

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdnote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll();
    const anecdoteToBeVoted = anecdotes.filter(anecdote => anecdote.id === id)[0];
    anecdoteToBeVoted.votes += 1
    const updatedAnecdote = await anecdotesService.update(id, {...anecdoteToBeVoted})
    dispatch(vote(updatedAnecdote))
  }
}