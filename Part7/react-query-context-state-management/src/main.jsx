import ReactDOM from 'react-dom/client'
import App from './App'
import blogReducer from './reducers/blogReducer'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import loginReducer from './reducers/loginReducer'
import { NotificationContextProvider } from './components/NotificationContext'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    login: loginReducer
  }
})

console.log('store', store.getState())

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <NotificationContextProvider>
      <App />
    </NotificationContextProvider>
  </Provider>
)

