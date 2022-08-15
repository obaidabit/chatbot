import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import UserContext from "../hooks/userContext";

function Login() {
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
              <h1>Login</h1>
              {error ? <p style={{ color: "tomato" }}>{error}</p> : null}
              <p>
                Doesn’t have an account yet ?
                <Link to="/signup" style={{ color: "white" }}>
                  <strong>Signup</strong>
                </Link>
              </p>

              <div>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="password">User Name</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter 6 character or more"
                />
              </div>
              <input type="submit" value="login" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
