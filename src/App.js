import { BsFillChatFill } from "react-icons/bs";
import "./App.css";
import Chat from "./components/Chat/Chat";
import Header from "./components/Header/Header";
import Landing from "./components/Landing/Landing";
import Services from "./components/Services/Services";
import Info from "./components/Info/Info";
import Achieve from "./components/Achieve/Achieve";
import Recent from "./components/Recent/Recent";
import Footer from "./components/Footer/Footer";
import arabic from "./translation/arabic.json";
import english from "./translation/english.json";
import { useEffect, useState } from "react";

function App() {
  const [language, setLanguage] = useState("en");
  const [translation, setTranslation] = useState(english);

  function show(e) {
    const chat = document.querySelector(".chat");
    if (chat.dataset.show === "false") {
      chat.classList.add("chat-show");
      chat.dataset.show = "true";
    } else {
      chat.classList.remove("chat-show");
      chat.dataset.show = "false";
    }
  }

  useEffect(() => {
    if (language === "en") {
      setTranslation(english);
      document.querySelector("html").lang = "en";
      if(document.styleSheets.length>14){
      document.styleSheets[14].disabled = true} 
    } else {
      setTranslation(arabic);
      document.querySelector("html").lang = "ar";
      let links = document.querySelectorAll("link")
      if(links.length == 4){
        let link =document.createElement("link")
        link.rel = "stylesheet"
        link.href = "./style-rtl.css"
        document.querySelector("head").appendChild(link) 
      }
      else document.styleSheets[14].disabled = false  
      }
  }, [language]);

  return (
    <div className="App" id="app">
      <Header value={translation.header} changeLanguage={setLanguage} />
      <Landing value={translation.landing} />
      <Services value={translation.services} />
      <Info value={translation.info} />
      <Achieve value={translation.achieve} />
      <Recent value={translation.recent} />
      <Footer value={translation.footer} />
      <button id="ichat" onClick={show}></button>
      <label className="show" htmlFor="ichat">
        <BsFillChatFill />
      </label>
      <Chat value={translation.chat} language={language} show = {show} />
    </div>
  );
}

export default App;
