import ReactDOM from 'react-dom/client';
import App from './App';
import blogReducer from './reducers/blogReducer';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import loginReducer from './reducers/loginReducer';
import { NotificationContextProvider } from './components/NotificationContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    login: loginReducer
  }
});

const queryClient = new QueryClient();

console.log('store', store.getState());

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <NotificationContextProvider>
        <App />
      </NotificationContextProvider>
    </QueryClientProvider>
  </Provider>
);

