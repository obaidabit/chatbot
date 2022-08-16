import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../hooks/userContext";

function Signup(props) {
  const user = useContext(UserContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSignup(e) {
    e.preventDefault();

    fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: e.target.elements["name"].value,
        email: e.target.elements["email"].value,
        password: e.target.elements["password"].value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          if (Boolean(data.status) === false && !data.id) {
            setError(data.msg);
            return;
          }
          navigate("../login", { replace: true });
        }
      });
  }
  return (
    <div className="signup">
      <div className="container">
        <img src="./img/signup.svg" />
        <div className="box">
          <div className="content">
            <form onSubmit={handleSignup}>
              <h1>{props.value.h1}</h1>
              <p style={{ color: "tomato" }}>{error}</p>
              <p>
              {props.value.p1}
                <Link to="/login" style={{ color: "white" }}>
                  <strong>{props.value.p2}</strong>
                </Link>
              </p>

              <div>
                <label htmlFor="email">{props.value.email}</label>
                <input id="email" type="text" placeholder={props.value.Pemail} />
              </div>
              <div>
                <label htmlFor="name">{props.value.username}</label>
                <input id="name" type="text" placeholder={props.value.Pusername} />
              </div>
              <div>
                <label htmlFor="password">{props.value.password}</label>
                <input
                  id="password"
                  type="password"
                  placeholder={props.value.Ppassword}
                />
              </div>
              <input type="submit" value={props.value.input} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Signup;
