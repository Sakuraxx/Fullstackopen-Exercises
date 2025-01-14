import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Blog from './Blog';
import { initializeBlogs, likeBlog, removeBlog } from '../reducers/blogReducer';
import { useNotificationDispatch } from './NotificationContext';

const BlogList = () => {
  const dispatch = useDispatch();
  const notificationDispatch = useNotificationDispatch();

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector(({ blogs }) => blogs)
  console.log('blogs', blogs)

  const updateBlog = async (uBlog) => {
    try {
      dispatch(likeBlog(uBlog))
      notificationDispatch({ type: 'NORMAL', payload: `Updated blog '${uBlog.title}'` });
      setTimeout(() => {notificationDispatch({ type: 'CLEAR' });}, 5000);

    } catch (exception) {
      notificationDispatch({ type: 'NORMAL', payload: exception });
      setTimeout(() => {notificationDispatch({ type: 'CLEAR' });}, 5000);
    }
  };

  const removeBlg = async (rBlog) => {
    try {
      dispatch(removeBlog(rBlog));
      notificationDispatch({ type: 'NORMAL', payload: `Deleted blog '${rBlog.title}'` });
      setTimeout(() => {notificationDispatch({ type: 'CLEAR' });}, 5000);
    } catch (exception) {
      notificationDispatch({ type: 'NORMAL', payload: exception });
      setTimeout(() => {notificationDispatch({ type: 'CLEAR' });}, 5000);
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