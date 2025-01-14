import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  console.log('notification', notification)

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