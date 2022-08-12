function Msg(props) {
  const { side, key, sender, msg, tag } = props;

  function getDate(date) {
    const houre = new Date().getHours();
    const h =
      houre > 12
        ? "0" + (((houre - 1) % 12) + 1)
        : houre == 0
        ? "12"
        : "0" + houre;
    const minutes = "0" + new Date().getMinutes();
    const time = h.slice(-2) + ":" + minutes.slice(-2);
    return houre <= 12 ? time + " AM" : time + " PM";
  }
  return (
    <div className={"msg-" + side} key={key}>
      <img src="./img/boy.png"></img>
      <div className="msg-details msg-bubble">
        <h4>{sender}</h4>
        {tag == "Load" ? (
          msg
        ) : (
          <p dangerouslySetInnerHTML={{ __html: msg }}></p>
        )}
        <span>{getDate()}</span>
      </div>
    </div>
  );
}
export default Msg;
