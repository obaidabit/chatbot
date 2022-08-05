import {Link, NavLink}from "react-router-dom"
import { AiOutlineMenu } from "react-icons/ai";
function Header(props) {
  return (
    <div className="header">
      <div className="container">
        {/* <a href="#">
          <span className="logo"></span>
        
        </a> */}
        <NavLink className="home" exact = "true" to ="/">
          <span className="logo"></span>
          ITS
        </NavLink>
        <ul className="nav">
          <li>
            <NavLink className={(status) => status.isActive?"active":""}  to ="/project">{props.value.projects}</NavLink>
          </li>
          <li>
            <NavLink className={(status) => status.isActive?"active":""}  to ="/contact">{props.value.contact}</NavLink>
          </li>
          <li>
            <NavLink className={(status) => status.isActive?"active":""}  to ="/about">{props.value.aboutus}</NavLink>
          </li>
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
