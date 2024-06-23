const Notification = ({ normalMsg, errMsg }) => {
  if (isNullOrUndefined(normalMsg) && isNullOrUndefined(errMsg)) {
    return null;
  }
  let fontColor = "green";
  let message = normalMsg;
  if (errMsg) {
    fontColor = "red";
    message = errMsg;
  }
  const style = {
    color: fontColor,
    fontStyle: "italic",
    fontSize: 24,
  };

  return <div style={style}>{message}</div>;
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

export { Notification, notifyNormalMsg, notifyErrMsg };
