import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import blogService from '../services/blogService';
import loginService from '../services/login';
import { login, logout } from '../reducers/loginReducer';
import { initializeBlogs, clear } from '../reducers/blogReducer';
import { setTimedNotification } from '../reducers/notificationReducer';
import LoginForm from '../components/LoginForm';
import TogglableBlogForm from './TogglableBlogForm';

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

  return (
    <>
      {userLogin === null ? (
        <LoginForm login={loginUser}></LoginForm>
      ) : (
        <div>
          <p>{userLogin.username} logged-in</p>
          <button onClick={handleLogout}>logout</button>
          <TogglableBlogForm username={userLogin.username}/>
        </div>
      )}
    </>
  );
}

export default UserDisplay;