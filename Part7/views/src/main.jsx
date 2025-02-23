import ReactDOM from 'react-dom/client'
import App from './App'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import loginReducer from './reducers/loginReducer'
import {
  BrowserRouter as Router,
} from 'react-router-dom'


const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    login: loginReducer
  }
})

console.log('store', store.getState())

ReactDOM.createRoot(document.getElementById('root')).render(
 <Router>
    <Provider store={store}>
        <App />
      </Provider>
  </Router>
)

