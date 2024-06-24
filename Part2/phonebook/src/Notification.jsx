const Notification = ({ msg, style }) => {
  if (isNullOrUndefined(msg)) {
    return null;
  }
  return <div style={style}>{msg}</div>;
};

const NormalNotification = ({ msg }) => {
  const style = {
    color: "green",
    fontStyle: "italic",
    fontSize: 24,
  };
  return <Notification msg={msg} style={style}></Notification>;
};

const ErrorNotification = ({ msg }) => {
  const style = {
    color: "red",
    fontStyle: "bold",
    fontSize: 24,
  };
  return <Notification msg={msg} style={style}></Notification>;
};

const isNullOrUndefined = (msg) => {
  return msg === null || msg === undefined;
};

const notifyNormalMsg = (msg, setNormalMsg) => {
  setNormalMsg(msg);
  setTimeout(() => {
    setNormalMsg(null);
  }, 5000);
};

const notifyErrMsg = (msg, setErrMsg) => {
  setErrMsg(msg);
  setTimeout(() => {
    setErrMsg(null);
  }, 5000);
};

export { NormalNotification, ErrorNotification, notifyNormalMsg, notifyErrMsg };
