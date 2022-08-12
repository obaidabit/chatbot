function PLanding(props){
  return(
    <div className="PLanding">
      <div className="container">
        <div className="content">
          <h2>{props.h2}</h2>
          <p>{props.p}</p>
        </div>
        <img src ="./img/projects.svg"></img>
      </div>
    </div>
  )
}
export default PLanding