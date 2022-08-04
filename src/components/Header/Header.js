import { AiOutlineMenu } from "react-icons/ai";
function Header(props) {
  return (
    <div className="header">
      <div className="container">
        <a href="#">
          <span className="logo"></span>
          ITS
        </a>
        <ul className="nav">
          <li>
            <a href="#">{props.value.projects}</a>
          </li>
          <li>
            <a href="#">{props.value.contact}</a>
          </li>
          <li>
            <a href="#">{props.value.aboutus}</a>
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
