function ContactBody() {
    return (
        <div className="ContactBody">
            <div className="intro">
                <h1>
                    We’d love to hear from you
                </h1>
                <p>
                    Whether you have a question about features, trails need a demo, or anything else, our team is ready to answer all your question
                </p>
            </div>
            <div>
                <form>
                    <div>
                        <label for="contact-reason">
                            What Can We Help You With?
                        </label>
                        <select id="contact-reason">
                            <option value="technecal issue">technecal issue</option>
                            <option value="new project">new project</option>
                            <option value="software feedback">software feedback</option>
                            <option value="SEO improvment">SEO improvment</option>
                        </select>
                    </div>
                    <div>

                        <label for="name">
                            Your Name
                        </label>
                        <input id="name" type="text" placeholder="your name" />
                    </div>
                    <div>
                        <label for="email">
                            Valid Email Address
                        </label>

                        <input id="email" type="text" placeholder="your email" />
                    </div>
                    <div>
                        <label for="subject">
                            Subject
                        </label>

                        <input id="subject" type="text" placeholder="Why are you contacting us?" />
                    </div>
                    <div>

                        <label for="message">
                            Details
                        </label>
                        <textarea id="message" rows={10} placeholder="write your message here" />
                    </div>
                    <div>
                    <input type="submit" value="Submit"/>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default ContactBody