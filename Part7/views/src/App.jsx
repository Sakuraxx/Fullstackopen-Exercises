import BlogList from './components/BlogList';
import Notification from './components/Notification';
import UserDisplay from './components/UserDisplay';
import {
  Routes, Route
} from 'react-router-dom'

import UserList from './components/Users'

const App = () => {
  return (
    <>
      <div>
        <Notification />
        <UserDisplay/>
        <BlogList/>
      </div>

      <Routes>
        <Route path="/users" element={<UserList/>} />
      </Routes>

    </>
  );
};

export default App;
