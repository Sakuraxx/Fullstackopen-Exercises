import BlogList from './components/BlogList';
import Notification from './components/Notification';
import UserDisplay from './components/UserDisplay';

const App = () => {
  return (
    <div>
      <Notification />
      <UserDisplay/>
      <BlogList/>
    </div>
  );
};

export default App;
