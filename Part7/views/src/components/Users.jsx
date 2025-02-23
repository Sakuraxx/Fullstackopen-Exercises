import { useEffect, useState } from 'react';
import userService from '../services/user';
import { Link, useParams } from 'react-router-dom';
import blogService from '../services/blogService';

const UserList = () => {
  const [users, setUsers] = useState([]); 

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await userService.getAll();
      setUsers(users); // Update state with fetched users
    };
    fetchUsers();
  }, []);
  
  console.log("users", users);

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map(user => 
              <tr key={user.id}>
                <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                <td>{user.blogs.length}</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
}


const UserBlogList = () => {
  const { id } = useParams(); // user id

  const [blogs, setBlogs] = useState([]);
  useEffect(() => {

    const fetchBlogs = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs); 
    };
    fetchBlogs();
  }, []);

  // console.log("blogs", blogs);
  // console.log("id", id);

  return (
    <div>
      <h2>
        {blogs?.[0]?.user?.id === id ? blogs[0].user.username : "No blogs found"}
      </h2>
      {blogs?.[0]?.user?.id === id && (
        <ul>
          {blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export {UserList, UserBlogList};
