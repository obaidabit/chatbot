import ContactLanding from "../components/Contact-landing/ContactLanding";
import ContactBody from "../components/ContactBody/ContactBody";
function Contact(props) {

  return (
    <div >
      <ContactLanding value={props.value}/>
      <ContactBody value={props.value} />
    </div>
  );
}
export default Contact