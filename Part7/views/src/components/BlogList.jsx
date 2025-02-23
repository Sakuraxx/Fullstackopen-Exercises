import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs} from '../reducers/blogReducer';
import {
  Link
} from 'react-router-dom'


const BlogList = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector(({ blogs }) => blogs)
  console.log('blogs', blogs)

  return (
    <>
      <h2>blogs</h2>
      <ul>
        {blogs && blogs
          .map((blog) => (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title}
              </Link>
            </li>
          ))}
      </ul>
    </>
  )
}
export default BlogList