import {Link} from "react-router-dom"
function Landing(props) {
  return (
    <div className="landing">
      <div className="container">
        <div className="box">
          <div className="content">
            <h5>{props.value.p1}</h5>
            <p>{props.value.p2}</p>
            <h5>{props.value.p3}</h5>
          </div>
          <div className="link">
            <a href="#">{props.value.btn1}</a>
            <Link to="/contact">{props.value.btn2}</Link>
          </div>
        </div>
        <img src="./img/landing.svg" alt=""></img>
      </div>
    </div>
  );
}
export default Landing;
