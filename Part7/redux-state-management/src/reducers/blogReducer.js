import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogService'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload.sort((first, second) => second.likes - first.likes)
    },
    add(state, action) {
      state.push(action.payload)
    },
    like(state, action) {
      const id = action.payload.id
      const res =  state.map(blog =>
        blog.id === id
          ? { ...action.payload }
          : blog
      ).sort((a, b) => b.likes - a.likes)
      return res
    },
    remove(state, action)
    {
      return state.filter(blog => blog.id !== action.payload.id)
    }
  }
})

export const { setBlogs, add, like, remove } = blogSlice.actions
export default blogSlice.reducer;

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    console.log('initializeBlogs', blogs)
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch(add(newBlog))
  }
}

export const likeBlog = (uBlog) => {
  return async dispatch => {
    console.log('likeBlog', uBlog)
    const blogLiked = await blogService.update(uBlog.id, uBlog)
    dispatch(like(blogLiked))
  }
}

export const removeBlog = (rBlog) => {
  return async dispatch => {
    await blogService.remove(rBlog.id)
    dispatch(remove(rBlog))
  }
}