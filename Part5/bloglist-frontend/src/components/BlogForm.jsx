const BlogForm = ({
  onSubmit,
  handleTitleChange,
  handleURLChange,
  title,
  url,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <label>Title:</label>
      <input value={title} onChange={handleTitleChange} />
      <label>URL:</label>
      <input value={url} onChange={handleURLChange} />
      <button type="submit">save</button>
    </form>
  );
};

export default BlogForm;
