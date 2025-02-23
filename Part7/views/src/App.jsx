import BlogList from './components/BlogList';
import Notification from './components/Notification';
import UserDisplay from './components/UserDisplay';
import { useEffect, useState } from 'react';

import {
  Routes, Route
} from 'react-router-dom'
import userService from './services/user';


const UserList = ({users}) => (
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
)


const App = () => {

  const [users, setUsers] = useState([]); 

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await userService.getAll();
      setUsers(users); // Update state with fetched users
    };
    fetchUsers();
  }, []); 

  return (
    <>
      <div>
        <Notification />
        <UserDisplay/>
        <BlogList/>
      </div>

      <Routes>
        <Route path="/users" element={<UserList users={users}/>} />
      </Routes>

    </>
  );
};

export default App;
