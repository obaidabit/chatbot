import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import UserContext from "../hooks/userContext";

function Login(props) {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const user = useContext(UserContext);

  function handleLogin(e) {
    e.preventDefault();
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e.target.elements["email"].value,
        password: e.target.elements["password"].value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          if (!data.status && !data.id) {
            setError(data.msg);
            return;
          }
          user.setUser(data);
          navigate("../", { replace: true });
        }
      });
  }
  return (
    <div className="signup">
      <div className="container">
        <img src="./img/signup.svg" />
        <div className="box">
          <div className="content">
            <form onSubmit={handleLogin}>
              <h1>{props.value.h1}</h1>
              {error ? <p style={{ color: "tomato" }}>{error}</p> : null}
              <p>
                {props.value.p1}
                <Link to="/signup" style={{ color: "white" }}>
                  <strong>{props.value.p2}</strong>
                </Link>
              </p>

              <div>
                <label htmlFor="email">{props.value.email}</label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  placeholder={props.value.Pemail}
                />
              </div>
              <div>
                <label htmlFor="password">{props.value.password}</label>
                <input
                  id="password"
                  type="password"
                  name="password"
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
export default Login;
