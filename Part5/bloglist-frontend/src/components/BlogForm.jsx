import { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newURL, setNewURL] = useState('');

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleURLChange = (event) => {
    setNewURL(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newBlog = {
      title: newTitle,
      url: newURL,
    };

    createBlog(newBlog);

    setNewTitle('');
    setNewURL('');
  };

  return (
    <form onSubmit={onSubmit}>
      <label>Title:</label>
      <input value={newTitle} onChange={handleTitleChange} />
      <label>URL:</label>
      <input value={newURL} onChange={handleURLChange} />
      <button type="submit">save</button>
    </form>
  );
};

export default BlogForm;
