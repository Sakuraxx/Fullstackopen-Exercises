import { createBlog } from '../reducers/blogReducer';
import { setTimedNotification } from '../reducers/notificationReducer';
import { useDispatch } from 'react-redux';
import BlogForm from '../components/BlogForm';
import Togglable from '../components/Togglable';

const TogglableBlogForm = ({ username }) => {
  const dispatch = useDispatch();

  const addBlog = async (nBlog) => {
    try {
      nBlog.author = username;
      dispatch(createBlog(nBlog))
      dispatch(setTimedNotification(`Added blog '${nBlog.title}'`, 5000));
    } catch (exception) {
      setTimedNotification(exception, 5000);
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