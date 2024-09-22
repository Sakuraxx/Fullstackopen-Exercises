import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newURL, setNewURL] = useState("");

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogout = (event) => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
    setBlogs([]);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      console.log("user", user);
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));

      // Update blogs after logging
      blogService.getAll().then((blogs) => setBlogs(blogs));
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const addBlog = async (event) => {
    event.preventDefault();

    const newBlog = {
      title: newTitle,
      url: newURL,
      author: user.username,
    };

    try {
      const savedBlog = await blogService.create(newBlog);
      console.log("saved blog", savedBlog);
      setNewTitle("");
      setNewURL("");

      // update blogs afte adding new one
      blogService.getAll().then((blogs) => setBlogs(blogs));
    } catch (exception) {
      setErrorMessage(exception);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleURLChange = (event) => {
    setNewURL(event.target.value);
  };

  return (
    <div>
      <div>{errorMessage}</div>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.username} logged-in</p>
          <button onClick={handleLogout}>logout</button>
          <Togglable buttonLabel="new blog">
            <BlogForm
              onSubmit={addBlog}
              title={newTitle}
              url={newURL}
              handleTitleChange={handleTitleChange}
              handleURLChange={handleURLChange}
            ></BlogForm>
          </Togglable>
        </div>
      )}

      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
