import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogService'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      console.log('setBlogs', action.payload)
      return action.payload.sort((first, second) => second.likes - first.likes)
    },
  }
})

export const { setBlogs } = blogSlice.actions
export default blogSlice.reducer;

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    console.log('initializeBlogs', blogs);
    dispatch(setBlogs(blogs))
  }
}
