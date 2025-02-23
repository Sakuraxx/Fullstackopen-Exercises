import { useEffect, useState } from 'react';
import userService from '../services/user';

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
                <td>{user.name}</td>
                <td>{user.blogs.length}</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
