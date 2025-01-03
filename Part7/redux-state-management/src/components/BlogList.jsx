import Blog from './Blog';

const BlogList = ({ blogs, update, remove }) => {
  return (
    <>
      <h2>blogs</h2>
      {blogs && blogs
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            update={update}
            remove={remove}
          />
        ))}
    </>
  )
}
export default BlogList