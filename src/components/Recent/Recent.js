
function Recent(props) {
  return (
    <div className="recent">
      <h2 className="main-title">{props.value.h2}</h2>
      <div className="container">
        <div className="box">
          <img src="./img/recent-01.svg" alt=""></img>
          <span>ACB</span>
        </div>
        <div className="box">
          <img src="./img/recent-02.svg" alt=""></img>
          <span>MSB</span>
        </div>
        <div className="box">
          <img src="./img/recent-03.svg" alt=""></img>
          <span>ABBANK</span>
        </div>
        <div className="box">
          <img src="./img/recent-04.svg" alt=""></img>
          <span>BAVOIETBANK</span>
        </div>
      </div>
    </div>
  );
}

export default Recent;
