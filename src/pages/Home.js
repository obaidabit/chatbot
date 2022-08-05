import Landing from "../components/Landing/Landing";
import Services from "../components/Services/Services";
import Info from "../components/Info/Info";
import Achieve from "../components/Achieve/Achieve";
import Recent from "../components/Recent/Recent";
import arabic from "../translation/arabic.json";
import english from "../translation/english.json";
import { useEffect, useState } from "react";

function Home(props){
  const [translation, setTranslation] = useState(english);

  useEffect(() => {
    if(props.lang === "en"){
      setTranslation(english);
    }else{
      setTranslation(arabic);
    }
  }, [props.lang]);
  return(
    <div>
      <Landing value={translation.landing} />
      <Services value={translation.services} />
      <Info value={translation.info} />
      <Achieve value={translation.achieve} />
      <Recent value={translation.recent} />
      
    </div>
  )
}
export default Home