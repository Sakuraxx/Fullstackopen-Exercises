import BlogList from './components/BlogList';
import Notification from './components/Notification';
import UserDisplay from './components/UserDisplay';
import {
  Routes, Route, Link
} from 'react-router-dom'

import {UserList, UserBlogList} from './components/Users'
import BlogDetail from './components/BlogDetail';

const App = () => {
  const padding = {
    paddingRight: 5
  }

  return (
    <>
      <div>
        <Link style={padding} to="/blogs">blogs</Link>
        <Link style={padding} to="/users">users</Link>
      </div>

      <h2>Blogs App</h2>
      <div>
        <Notification />
        <UserDisplay/>
        {/* <BlogList/> */}
      </div>

      <Routes>
        <Route path="/users" element={<UserList/>} />
        <Route path="/blogs" element={<BlogList/>} />
        <Route path="/users/:id" element={<UserBlogList/>} />
        <Route path="/blogs/:id" element={<BlogDetail/>}/>
      </Routes>

    </>
  );
};

export default App;
