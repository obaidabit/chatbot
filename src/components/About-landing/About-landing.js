function AboutLanding(props) {
    return (
        <div className="About-landing">
        <div className="container">
            <div className="box">
                <div className="content">
                    <h1>{props.value.h1}</h1>
                    <h3>{props.value.h3}</h3>
                </div>
            </div>
            <img src="./img/AboutLanding.svg" />
        </div>
    </div>
    )
}
export default AboutLanding