const Notification = ({ normalMsg, errMsg }) => {
  console.log("msg", normalMsg, errMsg);

  if (isNullOrUndefined(normalMsg) && isNullOrUndefined(errMsg)) {
    return null;
  }

  const style = {
    color: isNullOrUndefined(normalMsg) ? "red" : "green",
    fontStyle: "italic",
    fontSize: 24,
  };

  let message = isNullOrUndefined(normalMsg) ? errMsg : normalMsg;

  return <div style={style}>{message}</div>;
};

const isNullOrUndefined = (msg) => {
  return msg === null || msg === undefined;
};

export { Notification };
