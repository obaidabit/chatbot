
function Info(props) {
  return (
    <div className="S-info" >
      <div className="container">
        <img src="./img/logo.svg" alt="" data-aos="fade-right"></img>
        <div className="content" data-aos="fade-left">
          <h3>{props.value.h3}</h3>
          <p>{props.value.p}</p>
        </div>
      </div>
    </div>
  );
}

export default Info;
