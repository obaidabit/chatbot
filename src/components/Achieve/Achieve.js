
function Achieve(props) {
  return (
    <div className="achieve">
      <div className="container">
        <img src="./img/Achieve.svg"></img>
        <h2>{props.value.h2}</h2>
        <div className="statistics">
          <div className="box">
            <h2>47+</h2>
            <p>{props.value.workDone}</p>
          </div>

          <div className="box">
            <h2>5394+</h2>
            <p>{props.value.workHours}</p>
          </div>

          <div className="box">
            <h2>4809B</h2>
            <p>{props.value.lineOfCode}</p>
          </div>

          <div className="box">
            <h2>28+</h2>
            <p>{props.value.clients}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Achieve;
