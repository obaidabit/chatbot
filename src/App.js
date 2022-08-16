import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Project from "./pages/Project";
import Contact from "./pages/Contact";
import Footer from "./components/Footer/Footer";
import Chat from "./components/Chat/Chat";
import { BsFillChatFill } from "react-icons/bs";
import arabic from "./translation/arabic.json";
import english from "./translation/english.json";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Error from "./pages/Error";
import UserContext from "./hooks/userContext";

function App() {
  const [language, setLanguage] = useState("en");
  const [translation, setTranslation] = useState(english);
  const [user, setUser] = useState();
  const ChatRef = useRef(null);

  function show(e) {
    //const chat = document.querySelector(".chat");
    if (ChatRef.current.dataset.show === "false") {
      ChatRef.current.classList.add("chat-show");
      ChatRef.current.dataset.show = "true";
    } else {
      ChatRef.current.classList.remove("chat-show");
      ChatRef.current.dataset.show = "false";
    }
  }

  useEffect(() => {
    if (language === "en") {
      setTranslation(english);
      document.querySelector("html").lang = "en";
      if (document.styleSheets.length > 21) {
        document.styleSheets[21].disabled = true;
      }
    } else {
      setTranslation(arabic);
      document.querySelector("html").lang = "ar";
      let links = document.querySelectorAll("link");
      if (links.length == 5) {
        let link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "./style-rtl.css";
        document.querySelector("head").appendChild(link);
      } else document.styleSheets[21].disabled = false;
    }
    const cookie = document.cookie.replace(
      /(?:(?:^|.*;\s*)x-access-tokens\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    if (cookie) {
      fetch("/api/get_info")
        .then((res) => res.json())
        .then((data) => {
          if (data.email) {
            setUser(data);
          }
        });
    }
  }, [language]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <div className="App" id="app">
          <Header value={translation.header} changeLanguage={setLanguage} />
          <Routes>
            <Route path="/" exact element={<Home lang={language} />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/project"
              element={<Project value={translation.projects} />}
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Error />} />
          </Routes>
          <Footer value={translation.footer} />
          <button id="ichat" onClick={show}></button>
          <label className="show" htmlFor="ichat">
            <BsFillChatFill />
          </label>
          <Chat
            value={translation.chat}
            language={language}
            show={show}
            ChatRef={ChatRef}
          />
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
