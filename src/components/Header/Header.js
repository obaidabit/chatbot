import "./Header.css"
import {AiOutlineMenu} from "react-icons/ai"
function Header(){

    return(
        <div className="header">
            <div className="container">
                <a href="#" >
                    <span className="logo"></span>
                    ITS
                </a>
                <ul className="nav">
                    <li><a href="#">Projects</a></li>
                    <li><a href="#">Contact</a></li>
                    <li><a href="#">About us</a></li>
                </ul>
                <button id="menu" ></button>
                <label className='menu' htmlFor='menu'><AiOutlineMenu/></label>
                

            </div>
        </div>
    )

}

export default Header