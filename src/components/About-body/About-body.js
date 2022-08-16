function AboutBody(props) {
    return (

        <div className="About-body">
            <h1>
                {props.value.Bh1}
            </h1>
            <div className="container">
                <div className="paragraph">
                    <p>
                        {props.value.p1}
                    </p>
                    <p>
                        {props.value.p1}
                    </p>
                </div>
                <div className="paragraph">
                    <p>
                    {props.value.p2}<br></br><br></br>
                    {props.value.p3}<br></br><br></br>
                    {props.value.p4}

                    </p>
                </div>
            </div>
            <div className="link">
                <a href=""> {props.value.a}</a>
            </div>
            <hr />
            <div className="leadership">
                <div className="container">
                    <div className="left">
                        <h2 > {props.value.Lh1}</h2>
                        <h3 className="thefounder"> {props.value.Lh3}</h3>
                    </div>
                    <div className="right">
                        <h2>
                        {props.value.Rh2}
                        </h2>
                        <p>
                        {props.value.Rp1}
                        </p>
                        <p>
                        {props.value.Rp2}
                        </p>
                        <img id="linkedIn" src="./img/linkedinlogo.png"></img>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AboutBody