import { createBlog } from '../reducers/blogReducer';
import { useDispatch } from 'react-redux';
import BlogForm from '../components/BlogForm';
import Togglable from '../components/Togglable';
import { useNotificationDispatch } from './NotificationContext';

const TogglableBlogForm = ({ username }) => {
  const dispatch = useDispatch();
  const notificationDispatch = useNotificationDispatch();

  const addBlog = async (nBlog) => {
    try {
      nBlog.author = username;
      dispatch(createBlog(nBlog))
      notificationDispatch({ type: 'NORMAL', payload: `Added blog '${nBlog.title}'` });
      setTimeout(() => {notificationDispatch({ type: 'CLEAR' });}, 5000);
    } catch (exception) {
      notificationDispatch({ type: 'NORMAL', payload: exception });
      setTimeout(() => {notificationDispatch({ type: 'CLEAR' });}, 5000);
    }
  };

  return (
    <>
      <Togglable buttonLabel="new blog">
        <BlogForm createBlog={addBlog}></BlogForm>
      </Togglable>
    </>
  )
}

export default TogglableBlogForm;