function Signup() {
  return (
    <div className="signup">
      <div className="container">
      <img src="./img/signup.svg" />
        <div className="box">
          <div className="content">
            <form>
            <h1>Create  Account</h1>
            <p>Already have an account? <strong>login</strong> </p>

              <div>
                <label for="email">
                  Email
                </label>
                <input id="email" type="text" placeholder="you@example.com" />
              </div>
              <div>
                <label for="name">
                  User  Name
                </label>
                <input id="name" type="text" placeholder="write your name" />
              </div>
              <div>
                <label for="password">
                  User  Name
                </label>
                <input id="password" type="password" placeholder="Enter 6 character or more" />
              </div>
              <input type="submit" value="Submit"/>
              

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Signup