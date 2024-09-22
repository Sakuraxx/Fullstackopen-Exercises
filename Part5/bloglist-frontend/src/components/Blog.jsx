import { useState } from "react";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        <div>
          <span>{blog.title}</span>
          <button onClick={toggleVisibility}>hide</button>
        </div>
        <p>{blog.url}</p>
        <div>
          <span>likes {blog.likes}</span>
          <button>like</button>
        </div>
        <p>{blog.author}</p>
      </div>
    </div>
  );
};

export default Blog;
