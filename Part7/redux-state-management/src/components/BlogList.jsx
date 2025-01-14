import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Blog from './Blog';
import { initializeBlogs, likeBlog, removeBlog } from '../reducers/blogReducer';
import { setTimedNotification } from '../reducers/notificationReducer';

const BlogList = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector(({ blogs }) => blogs)
  console.log('blogs', blogs)

  const updateBlog = async (uBlog) => {
    try {
      dispatch(likeBlog(uBlog))
      dispatch(setTimedNotification(`Updated blog '${uBlog.title}'`, 5000));
    } catch (exception) {
      dispatch(setTimedNotification(exception, 5000));
    }
  };

  const removeBlg = async (rBlog) => {
    try {
      dispatch(removeBlog(rBlog))
      dispatch(setTimedNotification(`Deleted blog '${rBlog.title}'`, 5000));
    } catch (exception) {
      dispatch(setTimedNotification(exception, 5000));
    }
  };

  return (
    <>
      <h2>blogs</h2>
      {blogs && blogs
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            update={updateBlog}
            remove={removeBlg}
          />
        ))}
    </>
  )
}
export default BlogList