import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import blogService from '../services/blogService';
import loginService from '../services/login';
import { login, logout } from '../reducers/loginReducer';
import { initializeBlogs, createBlog, clear } from '../reducers/blogReducer';
import { setTimedNotification } from '../reducers/notificationReducer';
import LoginForm from '../components/LoginForm';
import BlogForm from '../components/BlogForm';
import Togglable from '../components/Togglable';

const UserDisplay = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(login(user));
      blogService.setToken(user.token);
    }
  }, []);


  const userLogin = useSelector(state => state.login)
  console.log('login user', userLogin);

  const loginUser = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });
      blogService.setToken(user.token);
      dispatch(login(user));
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      // Update blogs after logging
      dispatch(initializeBlogs())
    } catch (exception) {
      dispatch(setTimedNotification('Wrong credentials', 5000));
    }
  };

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(logout());
    dispatch(clear())
  };

  const addBlog = async (nBlog) => {
    try {
      nBlog.author = userLogin.username;
      dispatch(createBlog(nBlog))
      dispatch(setTimedNotification(`Added blog '${nBlog.title}'`, 5000));
    } catch (exception) {
      setTimedNotification(exception, 5000);
    }
  };

  return (
    <>
      {userLogin === null ? (
        <LoginForm login={loginUser}></LoginForm>
      ) : (
        <div>
          <p>{userLogin.username} logged-in</p>
          <button onClick={handleLogout}>logout</button>
          <Togglable buttonLabel="new blog">
            <BlogForm createBlog={addBlog}></BlogForm>
          </Togglable>
        </div>
      )}
    </>
  );
}

export default UserDisplay;