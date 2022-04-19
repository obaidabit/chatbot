import "./Footer.css"
import {FaMapMarkerAlt,FaEnvelope,FaTelegramPlane,FaTwitter,FaWhatsapp} from "react-icons/fa"
import {MdCall} from "react-icons/md"
import {RiFacebookFill} from "react-icons/ri"

function Footer(){
    return (
        <div className="footer">
            <div className="container">
                <a href="#" className="logo">
                    <img src="./img/Logo.svg"></img>
                    ITS
                </a>
                <ul className="link">
                    <li><a href="#">Terms of Service</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Contact</a></li>
                    <li><a href="#">About us</a></li>
                </ul>
                <div className="box">
                    <div className="line">
                        <FaMapMarkerAlt className="map"/>
                        <div className="info">Address 1, Street 1, City 1, Country 1</div>
                    </div>
                    <div className="line">
                        <MdCall/>
                        <div className="info">012 345 6789</div>
                    </div>
                    <div className="line">
                        <FaEnvelope/>
                        <div className="info">company@email.com</div>
                    </div>
                    <ul className="social">
                        <li><a href="#" className="facebook"><RiFacebookFill/></a></li>
                        <li><a href="#" className="telegram"><FaTelegramPlane/></a></li>
                        <li><a href="#" className="twitter"><FaTwitter/></a></li>
                        <li><a href="#" className="whats"><MdCall/></a></li>
                    </ul>
                    
                </div>

            </div>
            <p className="copyright">All rights reserved &copy; 2003-2022</p>
        </div>
    )
}

export default Footer