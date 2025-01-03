import { useState, useEffect } from 'react';
import BlogList from './components/BlogList';
import blogService from './services/blogService';
import loginService from './services/login';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import { setTimedNotification } from './reducers/notificationReducer';
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, createBlog, likeBlog, removeBlog, clear } from './reducers/blogReducer';

const App = () => {
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector(({ blogs }) => blogs)
  console.log('blogs', blogs)

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    dispatch(clear())
  };

  const loginUser = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });
      blogService.setToken(user.token);
      setUser(user);
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      // Update blogs after logging
      dispatch(initializeBlogs())
    } catch (exception) {
      dispatch(setTimedNotification('Wrong credentials', 5000));
    }
  };

  const addBlog = async (nBlog) => {
    try {
      nBlog.author = user.username;
      dispatch(createBlog(nBlog))
      dispatch(setTimedNotification(`Added blog '${nBlog.title}'`, 5000));
    } catch (exception) {
      setTimedNotification(exception, 5000);
    }
  };

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
      {user === null ? (
        <LoginForm login={loginUser}></LoginForm>
      ) : (
        <div>
          <p>{user.username} logged-in</p>
          <button onClick={handleLogout}>logout</button>
          <Togglable buttonLabel="new blog">
            <BlogForm createBlog={addBlog}></BlogForm>
          </Togglable>
        </div>
      )}
      <BlogList blogs={blogs} remove={removeBlg} update={updateBlog}/>
    </div>
  );
};

export default App;
