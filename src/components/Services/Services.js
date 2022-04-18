import "./Services.css"

function Services(){
    return(
    <div className="services">
        <h2 className="main-title">Our Services</h2>
        <div className="container">
                <div className="service">
                    <div className="content">
                        <h3>Mobile App</h3>
                        <p>Specializes in designing beautiful applications for iPhone and Android devices</p>
                    </div>
                    <img src="./img/service-01.svg"></img>
                </div>
                <div className="service">
                    <div className="content">
                        <h3>Web Develop</h3>
                        <p>Specializes in the design of websites, automation systems and web software</p>
                    </div>
                    <img src="./img/service-02.svg"></img>
                </div>
                <div className="service">
                    <div className="content">
                        <h3>UX & UI Design</h3>
                        <p>such as logo design, photos, and any other visuals to communicate your brand</p>
                    </div>
                    <img src="./img/service-03.svg"></img>
                </div>
                <div className="service">
                    <div className="content">
                        <h3>Server Managment</h3>
                        <p>monitoring and maintenance required for servers to operate reliably and at optimal performance levels</p>
                    </div>
                    <img src="./img/service-04.svg"></img>
                </div>
            </div>

    </div>)
}

export default Services