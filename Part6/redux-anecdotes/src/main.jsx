import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './App'
import filterReducer from './reducers/filterReducer'
import reducer from './reducers/anecdoteReducer'

const store = configureStore({
  reducer: {
    anecdotes: reducer,
    filter: filterReducer
  }
})

console.log(store.getState())

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)