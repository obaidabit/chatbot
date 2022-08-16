function ContactBody(props) {
    return (
        <div className="ContactBody">
        <div className="intro">
            <h1>
                {props.value.Bh1}
            </h1>
            <p>
                {props.value.p}
            </p>
        </div>
        <div>
            <form>
                <div>
                    <label htmlFor="contact-reason">
                    {props.value.contactReason}
                    </label>
                    <select id="contact-reason">
                        <option value="technecal issue">{props.value.option1}</option>
                        <option value="new project">{props.value.option2}</option>
                        <option value="software feedback">{props.value.option3}</option>
                        <option value="SEO improvment">{props.value.option4}</option>
                    </select>
                </div>
                <div>

                    <label htmlFor="name">
                    {props.value.name}
                    </label>
                    <input id="name" type="text" placeholder={props.value.Pname} />
                </div>
                <div>
                    <label htmlFor="email">
                    {props.value.email}
                    </label>

                    <input id="email" type="text" placeholder={props.value.Pemail} />
                </div>
                <div>
                    <label htmlFor="subject">
                    {props.value.subject}
                    </label>

                    <input id="subject" type="text" placeholder={props.value.Pselect} />
                </div>
                <div>

                    <label htmlFor="message">
                    {props.value.message}
                    </label>
                    <textarea id="message" rows={10} placeholder={props.value.Pmessage} />
                </div>
                <div className="abox">
                <input type="submit" value={props.value.submit}/>
                </div>
            </form>
        </div>
    </div>
    )
}
export default ContactBody