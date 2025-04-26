import useField from '../hooks';

const BlogForm = ({ createBlog }) => {
  const titleFiled = useField('text');
  const urlField = useField('text');

  const onSubmit = (event) => {
    event.preventDefault();

    const newBlog = {
      title: titleFiled.value,
      url: urlField.value,
    };

    createBlog(newBlog);

    titleFiled.reset();
    urlField.reset();
  };

  return (
    <form onSubmit={onSubmit}>
      <label>Title:</label>
      <input id='title-input'
        value={titleFiled.value}
        type={titleFiled.type}
        onChange={titleFiled.onChange} />

      <label>URL:</label>
      <input id='url-input'
        value={urlField.value}
        type={urlField.type}
        onChange={urlField.onChange} />
      <button type="submit">save</button>
    </form>
  );
};

export default BlogForm;
