import BlogForm from '../components/BlogForm';
import Togglable from '../components/Togglable';
import { useNotificationDispatch } from './NotificationContext';
import blogService from '../services/blogService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const TogglableBlogForm = ({ username }) => {
  const notificationDispatch = useNotificationDispatch();

  // create - useMutation
  const queryClient = useQueryClient();
  const newBlogsMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      // refresh data
      queryClient.invalidateQueries({ queryKey: ['blogs'] });

      const blogs = queryClient.getQueryData('blogs');
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog));
      console.log('after addition', blogs);

      notificationDispatch({ type: 'NORMAL', payload: `Added blog '${newBlog.title}'` });
      setTimeout(() => {notificationDispatch({ type: 'CLEAR' });}, 5000);
    },
    onError: (err) => {
      notificationDispatch({ type: 'ERROR', payload: err.response.data.error });
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR', payload: '' });
      }, 5000);
    }
  });

  const addBlog = async (nBlog) => {
    try {
      nBlog.author = username;
      console.log('addBlog');
      newBlogsMutation.mutate(nBlog);
    } catch (exception) {
      notificationDispatch({ type: 'NORMAL', payload: exception });
      setTimeout(() => {notificationDispatch({ type: 'CLEAR' });}, 5000);
    }
  };

  return (
    <>
      <Togglable buttonLabel="new blog">
        <BlogForm createBlog={addBlog}></BlogForm>
      </Togglable>
    </>
  );
};

export default TogglableBlogForm;