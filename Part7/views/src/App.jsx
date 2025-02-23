import BlogList from './components/BlogList';
import Notification from './components/Notification';
import UserDisplay from './components/UserDisplay';
import {
  Routes, Route
} from 'react-router-dom'

import {UserList, UserBlogList} from './components/Users'
import BlogDetail from './components/BlogDetail';

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
        <Route path="/users/:id" element={<UserBlogList/>} />
        <Route path="/blogs/:id" element={<BlogDetail/>}/>
      </Routes>

    </>
  );
};

export default App;
