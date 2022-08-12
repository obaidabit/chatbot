
function VProject(props) {
  const {year,nameProject,typeProject,img} = props
  return (
    <div className="">
      <div className="container">
        <div className="year">
          <h2 className="year1">{year}</h2>
          <div className="projects">
            <div className="project">
              <h2>{nameProject[0]} <span>{typeProject.length > 1?typeProject[0]:typeProject}</span></h2>
              <div className="box">
              <img src={`./img/${img[0]}`}/>
              </div>
            </div>
            <div className="project">
              <h2>{nameProject[1]} <span>{typeProject.length > 1?typeProject[1]:typeProject}</span></h2>
              <div className="box">
              <img src={`./img/${img[1]}`}/>
              </div>
            </div>
            <div className="project">
              <h2>{nameProject[2]} <span>{typeProject.length > 1?typeProject[0]:typeProject}</span></h2>
              <div className="box">
              <img src={`./img/${img[2]}`}/>
              </div>
            </div>
            <div className="project">
              <h2>{nameProject[3]} <span>{typeProject.length > 1?typeProject[1]:typeProject}</span></h2>
              <div className="box">
              <img src={`./img/${img[3]}`}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default VProject