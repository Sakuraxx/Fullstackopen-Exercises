import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { likeBlog, removeBlog } from '../reducers/blogReducer';
import { setTimedNotification } from '../reducers/notificationReducer';

const BlogDetail = () => {
  const dispatch = useDispatch();

  // update logic
  const updateBlog = async (uBlog) => {
    try {
      dispatch(likeBlog(uBlog))
      dispatch(setTimedNotification(`Updated blog '${uBlog.title}'`, 5000));
    } catch (exception) {
      dispatch(setTimedNotification(exception, 5000));
    }
  };

  const handleLikes = (event) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    updateBlog(updatedBlog);
  };

  // remove logic
  const removeBlg = async (rBlog) => {
    try {
      dispatch(removeBlog(rBlog))
      dispatch(setTimedNotification(`Deleted blog '${rBlog.title}'`, 5000));
    } catch (exception) {
      dispatch(setTimedNotification(exception, 5000));
    }
  };

  const handleRemove = (event) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      removeBlg(blog);
    }
  };

  const { id } = useParams(); 
  const blogs = useSelector(({ blogs }) => blogs);
  const blog = blogs.find((b) => b.id === id); 

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div>
      <h2>{blog.title}</h2>

      <a href=''>{blog.url}</a>

      <div>
        <span>likes {blog.likes}</span>
        <button onClick={handleLikes} >like</button>
      </div>
      <p>{blog.author}</p>
      <button onClick={handleRemove} >remove</button>

      <p>added by {blog.user?.username}</p>
    </div>
  );
};

export default BlogDetail;