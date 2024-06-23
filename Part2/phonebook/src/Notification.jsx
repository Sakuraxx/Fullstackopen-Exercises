const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    const style = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 24
    }

    return (
      <div style={style}>
        {message}
      </div>
    )
  }

  export default Notification;