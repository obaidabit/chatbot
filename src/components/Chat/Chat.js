import { AiOutlineClose } from "react-icons/ai";
import { MdSend } from "react-icons/md";
import "./Chat.css";

function Chat() {
  function MsgSubmit(e) {
    e.preventDefault();
    const MsgText = e.target[0].value;
    if (!MsgText) return;
    appendMsg("right", MsgText);
    e.target[0].value = "";
    botResponse(MsgText);
  }
  function appendMsg(side, text) {
    const MsgHTML = `
        <div class='msg-${side}'>
            <img src='./img/boy.png'></img>
            <div class='msg-details msg-bubble'>
                    <h4>Chatbot</h4>
                    <p>${text}</p>
                    <span>${getDate()}</span>
            </div>
        </div>
        `;
    const box = document.querySelector(".chat .msg-box");
    box.insertAdjacentHTML("beforeend", MsgHTML);
    box.scrollTop += 500;
  }
  async function botResponse(text) {
    try {
      const response = await fetch("/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ msg: text }),
      });
      //console.log(response)
      const data = await response.json();
      console.log(data);
      setTimeout(() => {
        appendMsg("left", data.msg);
      }, 1500);
    } catch (e) {
      console.log(e.massage);
    }
  }
  function getDate(date) {
    const houre = "0" + new Date().getHours();
    const minutes = "0" + new Date().getMinutes();
    const time = houre.slice(-2) + ":" + minutes.slice(-2);
    return houre <= 12 ? time + " AM" : time + " PM";
  }
  function close(e) {}
  return (
    <div className="chat" data-show="false">
      <header>
        <h4>Company Chat</h4>
        <a className="close" onClick={getDate}>
          {" "}
          <AiOutlineClose />{" "}
        </a>
      </header>
      <div className="msg-box">
        <div className="msg-left ">
          <img src="./img/boy.png"></img>
          <div className="msg-details msg-bubble">
            <h4>Chatbot</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae,
              harum !
            </p>
            <span>{getDate()}</span>
          </div>
        </div>
      </div>
      <form className="msg-form" onSubmit={MsgSubmit}>
        <input
          className="msg-content"
          type="text"
          placeholder="Write a message"
        ></input>
        <button className="msg-submit" type="submit">
          <MdSend />
        </button>
      </form>
    </div>
  );
}

export default Chat;
