import {BsFillChatFill} from 'react-icons/bs'
import './App.css';
import Chat from './components/Chat/Chat';

function App() {
  function show(e){
    const chat=document.querySelector(".chat")
    if(chat.dataset.show  === "false"){
      chat.classList.add("chat-show")
      chat.dataset.show = "true"  

    }
    else {
      chat.classList.remove("chat-show")
      chat.dataset.show = "false" 
    }
  }
  return (
    <div className="App" id="app">
      <button id="ichat" onClick={show}></button>
      <label className='show' htmlFor='ichat'><BsFillChatFill /></label>
      <Chat/>
      
      
    </div>
  );
}

export default App;