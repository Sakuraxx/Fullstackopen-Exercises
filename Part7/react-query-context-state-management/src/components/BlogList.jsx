import { useDispatch } from 'react-redux';
import Blog from './Blog';
import { likeBlog, removeBlog } from '../reducers/blogReducer';
import { useNotificationDispatch } from './NotificationContext';
import { useQuery } from '@tanstack/react-query';
import blogService from '../services/blogService';

const BlogList = () => {
  const dispatch = useDispatch();
  const notificationDispatch = useNotificationDispatch();

  // react useQuery
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 2
  });

  console.log('useQuery', data);

  if (isPending) {
    return <div>loading data...</div>;
  }

  if (isError) {
    return <span>blogs service not available due to {error.message}</span>;
  }

  const blogs = data;

  const updateBlog = async (uBlog) => {
    try {
      dispatch(likeBlog(uBlog));
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
  );
};
export default BlogList;