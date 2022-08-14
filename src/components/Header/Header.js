import {Link, NavLink}from "react-router-dom"
import { AiOutlineMenu } from "react-icons/ai";
import { useRef } from "react";
function Header(props) {
  const HeaderRef = useRef(null)
  const logoRef = useRef(null)
  const imgRef =useRef(null)
  function changeHeader(e){
    if(e.target.href != "http://localhost:3000/" && e.target.href !== undefined  ){
      HeaderRef.current.classList.add ("not-active")
      logoRef.current.classList.add("isactive")
      imgRef.current.src = "./img/HeaderLogo1.svg"
    }
    else{
      HeaderRef.current.classList.remove("not-active")
      logoRef.current.classList.remove("isactive")
      imgRef.current.src = "./img/HeaderLogo2.svg"

    }
  }
  return (
    <div className="header" ref={HeaderRef}>
      <div className="container">
        {/* <a href="#">
          <span className="logo"></span>
        
        </a> */}
        <NavLink className="home" exact = "true" to ="/"   onClick = {changeHeader}>
          <img src="./img/HeaderLogo2.svg" ref={imgRef}></img>
          <span ref={logoRef}>ITS</span>
          
        </NavLink>
        <ul className="nav">
          <li>
            <NavLink className={(status) => status.isActive?"active":""} onClick = {changeHeader}  to ="/project">{props.value.projects}</NavLink>
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
