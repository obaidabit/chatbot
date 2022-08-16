function ContactLanding(props) {
    return (
<div className="ContactLanding">
            <div className="container">
                <img src="./img/Contactus.svg" />
                <div className="box">
                    <div className="content">
                        <h1>{props.value.h1}</h1>
                        <h3>{props.value.h3}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ContactLanding