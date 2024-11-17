import { useSelector, useDispatch } from 'react-redux'

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)

  if (notification) {
    setTimeout(() => {
      dispatch({ type: 'notification/clearNotification', payload: notification})
    }, 5000)
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    margin: 20
  }
  return (
    notification && <div style={style}>
      {notification}
    </div>
  )
}

export default Notification