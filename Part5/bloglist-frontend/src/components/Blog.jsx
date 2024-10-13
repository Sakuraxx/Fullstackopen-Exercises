import { useState } from 'react';

const Blog = ({ blog, update, remove }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLikes = (event) => {
    let uBlog = blog;
    uBlog.likes += 1;
    // Note here, we can not pass a object
    uBlog.user = blog.user.id;
    update(uBlog);
  };

  const handleRemove = (event) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      remove(blog);
    }
  };

  return (
    <div style={blogStyle} className='blog'>
      <div style={hideWhenVisible} className='hideWhenVisible'>
        {blog.title}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className='showWhenVisible'>
        <div>
          <span>{blog.title}</span>
          <button onClick={toggleVisibility}>hide</button>
        </div>
        <p>{blog.url}</p>
        <div>
          <span>likes {blog.likes}</span>
          <button onClick={handleLikes}>like</button>
        </div>
        <p>{blog.author}</p>
        <button onClick={handleRemove}>remove</button>
      </div>
    </div>
  );
};

export default Blog;
