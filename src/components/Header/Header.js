import { NavLink } from "react-router-dom";
import { AiOutlineMenu, AiOutlineLogout } from "react-icons/ai";
import { useRef } from "react";
import { useContext } from "react";
import UserContext from "../../hooks/userContext";

function Header(props) {
  const HeaderRef = useRef(null);
  const logoRef = useRef(null);
  const imgRef = useRef(null);
  const user = useContext(UserContext);

  function handleLogout() {
    fetch("/api/logout", {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        user.setUser();
      }
    });
  }
  function changeHeader(e) {
    if (
      e.target.href != "http://localhost:3000/" &&
      e.target.href !== undefined
    ) {
      HeaderRef.current.classList.add("not-active");
      logoRef.current.classList.add("isactive");
      imgRef.current.src = "./img/HeaderLogo1.svg";
    } else {
      HeaderRef.current.classList.remove("not-active");
      logoRef.current.classList.remove("isactive");
      imgRef.current.src = "./img/HeaderLogo2.svg";
    }
  }
  return (
    <div className="header" ref={HeaderRef}>
      <div className="container">
        {/* <a href="#">
          <span className="logo"></span>
        
        </a> */}
        <NavLink className="home" exact="true" to="/" onClick={changeHeader}>
          <img src="./img/HeaderLogo2.svg" ref={imgRef}></img>
          <span ref={logoRef}>ITS</span>
        </NavLink>
        <ul className="nav">
          <li>
            <NavLink
              className={(status) => (status.isActive ? "active" : "")}
              onClick={changeHeader}
              to="/project"
            >
              {props.value.projects}
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(status) => (status.isActive ? "active" : "")}
              onClick={changeHeader}
              to="/contact"
            >
              {props.value.contact}
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(status) => (status.isActive ? "active" : "")}
              onClick={changeHeader}
              to="/about"
            >
              {props.value.aboutus}
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(status) => (status.isActive ? "active" : "")}
              onClick={changeHeader}
              to="/login"
            >
              {props.value.login}
            </NavLink>
          </li>
          {user.user ? (
            <li className="user">
              <span>{user.user.name}</span>
              <button className="logout" onClick={handleLogout} title="logout">
                <AiOutlineLogout />
              </button>
            </li>
          ) : null}
          <select onChange={(e) => props.changeLanguage(e.target.value)}>
            <option value="en">{props.value.language.en}</option>
            <option value="ar">{props.value.language.ar}</option>
          </select>
        </ul>
        <button id="menu"></button>
        <label className="menu" htmlFor="menu">
          <AiOutlineMenu />
        </label>
      </div>
    </div>
  );
}

export default Header;
