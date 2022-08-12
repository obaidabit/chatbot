import Button from "../components/Project/Button"
import PLanding from "../components/Project/Project-Landing/PLanding"
import VProject from "../components/Project/View-Project/VProject"

function Project(props){
  return(
    <div className="PProject">
      <PLanding h2={props.value.h2} p={props.value.p}/>
      <div className="VProject"> 
        <VProject year ="2022" nameProject={["Maesto Badge","Design Festival","Arab Echo","Business Echo"]} typeProject ={ props.value.type} img = {["2022-1.svg","2022-2.svg","2022-3.svg","2022-4.svg"]}/>
        <VProject year ="2021" nameProject={["Fit N Glow","Email-24","LIVV ","Consept House"]} typeProject = {props.value.type} img = {["2021-1.svg","2021-2.svg","2021-3.svg","2021-4.svg"]}/>
        <Button text={props.value.button}/>
      </div>
    </div>
  )
}
export default Project