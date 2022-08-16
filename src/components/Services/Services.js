
function Services(props) {
  return (
    <div className="services" data-aos="fade-up">
      <h2 className="main-title">{props.value.h2}</h2>
      <div className="container">
        <div className="service">
          <div className="content">
            <h3>{props.value.section1.h3}</h3>
            <p>{props.value.section1.p}</p>
          </div>
          <img src="./img/service-01.svg" alt=""></img>
        </div>
        <div className="service">
          <div className="content">
            <h3>{props.value.section2.h3}</h3>
            <p>{props.value.section2.p}</p>
          </div>
          <img src="./img/service-02.svg" alt=""></img>
        </div>
        <div className="service">
          <div className="content">
            <h3>{props.value.section3.h3}</h3>
            <p>{props.value.section3.p}</p>
          </div>
          <img src="./img/service-03.svg" alt=""></img>
        </div>
        <div className="service">
          <div className="content">
            <h3>{props.value.section4.h3}</h3>
            <p>{props.value.section4.p}</p>
          </div>
          <img src="./img/service-04.svg" alt=""></img>
        </div>
      </div>
    </div>
  );
}

export default Services;
