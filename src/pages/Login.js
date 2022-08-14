function Login(){
  return(
    <div className="signup">
      <div className="container">
      <img src="./img/signup.svg" />
        <div className="box">
          <div className="content">
            <form>
            <h1>Login</h1>
            <p>Doesn’t have an account yet ?  <strong>Signup</strong> </p>

              <div>
                <label for="email">
                  Email
                </label>
                <input id="email" type="text" placeholder="you@example.com" />
              </div>
              <div>
                <label for="password">
                  User  Name
                </label>
                <input id="password" type="password" placeholder="Enter 6 character or more" />
              </div>
              <input type="submit" value="login"/>
              

            </form>
          </div>
        </div>
      </div>
    </div>

  )
}
export default Login