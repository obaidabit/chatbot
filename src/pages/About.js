import AboutLanding from "../components/About-landing/About-landing"
import AboutBody from "../components/About-body/About-body"
function About(props){

  return(

    <div>
      <AboutLanding value={props.value}/>
      <AboutBody value={props.value}/>
    </div>
  );
}
export default About