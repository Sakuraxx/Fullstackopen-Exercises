import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

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

  const handleNewTitle = (event) => {
    setNewTitle(event.target.value);
  };

  const handleNewURL = (event) => {
    setNewURL(event.target.value);
  };

  const addBlog = async (event) => {
    event.preventDefault();

    const newBlog = {
      title: newTitle,
      url: newURL,
    };

    try {
      const savedBlog = await blogService.create(newBlog);
      console.log("saved blog", savedBlog);
      setNewTitle("");
      setNewURL("");
    } catch (exception) {
      setErrorMessage(exception);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <label>Title:</label>
      <input value={newTitle} onChange={handleNewTitle} />
      <label>URL:</label>
      <input value={newURL} onChange={handleNewURL} />
      <button type="submit">save</button>
    </form>
  );

  return (
    <div>
      <div>{errorMessage}</div>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged-in</p>
          {blogForm()}
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
