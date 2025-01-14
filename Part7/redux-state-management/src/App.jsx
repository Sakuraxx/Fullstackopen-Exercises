import { useEffect } from 'react';
import BlogList from './components/BlogList';
import Notification from './components/Notification';
import { setTimedNotification } from './reducers/notificationReducer';
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, likeBlog, removeBlog } from './reducers/blogReducer';
import UserDisplay from './components/UserDisplay';

const App = () => {
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
    <div>
      <Notification />
      <UserDisplay/>
      <BlogList blogs={blogs} remove={removeBlg} update={updateBlog}/>
    </div>
  );
};

export default App;
