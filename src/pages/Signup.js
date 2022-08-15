import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../hooks/userContext";

function Signup() {
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
              <h1>Create Account</h1>
              <p style={{ color: "tomato" }}>{error}</p>
              <p>
                Already have an account?
                <Link to="/login" style={{ color: "white" }}>
                  <strong>login</strong>
                </Link>
              </p>

              <div>
                <label htmlFor="email">Email</label>
                <input id="email" type="text" placeholder="you@example.com" />
              </div>
              <div>
                <label htmlFor="name">User Name</label>
                <input id="name" type="text" placeholder="write your name" />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter 6 character or more"
                />
              </div>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Signup;
