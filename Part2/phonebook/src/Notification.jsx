const Notification = ({ message, style }) => {
  if (message === null) {
    return null;
  }

  return <div style={style}>{message}1111</div>;
};

const NormalNotifcation = ({ message }) => {
  const style = {
    color: "green",
    fontStyle: "italic",
    fontSize: 24,
  };

  return <Notification message={message} style={style}></Notification>;
};

export { NormalNotifcation };
