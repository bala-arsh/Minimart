import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/contact.css";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const Contact = () => {
  const [formValues, setFormValues] = useState(initialForm);
  const [formMessage, setFormMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((current) => ({ ...current, [name]: value }));
    setFormMessage("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formValues.name.trim() ||
      !formValues.email.trim() ||
      !formValues.subject.trim() ||
      !formValues.message.trim()
    ) {
      setFormMessage("Complete all contact fields before sending your message.");
      return;
    }

    setFormMessage("Message sent. MiniMart support will get back to you soon.");
    setFormValues(initialForm);
  };

  return (
    <div className="page-shell">
      <Header selectedCategory="all" setSelectedCategory={() => {}} />
      <main className="container contact-page">
        <section className="contact-hero">
          <div className="contact-orb orb-one" aria-hidden="true" />
          <div className="contact-orb orb-two" aria-hidden="true" />
          <div className="contact-grid">
            <div className="contact-copy">
              <h1>Let&apos;s build a smoother shopping experience together</h1>
              <p className="hero-copy contact-lead">
                Reach out for support, product questions, collaboration, or feedback. The page uses
                animated background motion to give the section some life without overwhelming the content.
              </p>
              <div className="contact-points">
                <div className="contact-point">
                  <span className="point-label">Email</span>
                  <strong>support@minimart.com</strong>
                </div>
                <div className="contact-point">
                  <span className="point-label">Phone</span>
                  <strong>+91 86107 79485</strong>
                </div>
                <div className="contact-point">
                  <span className="point-label">Hours</span>
                  <strong>Mon - Sat, 9:00 AM to 7:00 PM</strong>
                </div>
              </div>
            </div>

            <form className="contact-form-card" onSubmit={handleSubmit}>
              <h2>Send a message</h2>
              <label className="contact-field">
                Name
                <input type="text" name="name" placeholder="Your full name" value={formValues.name} onChange={handleChange} />
              </label>
              <label className="contact-field">
                Email
                <input type="email" name="email" placeholder="you@example.com" value={formValues.email} onChange={handleChange} />
              </label>
              <label className="contact-field">
                Subject
                <input type="text" name="subject" placeholder="What do you need help with?" value={formValues.subject} onChange={handleChange} />
              </label>
              <label className="contact-field">
                Message
                <textarea rows="5" name="message" placeholder="Write your message here" value={formValues.message} onChange={handleChange} />
              </label>
              {formMessage && <p className="contact-message">{formMessage}</p>}
              <button type="submit" className="contact-submit">Send message</button>
            </form>
          </div>
        </section>

        <section className="contact-info-strip">
          <article className="info-card">
            <p className="point-label">Support lane</p>
            <h3>Order and account help</h3>
            <p>Fast answers for shipping, returns, account access, and product availability.</p>
          </article>
          <article className="info-card">
            <p className="point-label">Business lane</p>
            <h3>Partnerships and sourcing</h3>
            <p>For wholesale interest, brand collaboration, and vendor conversations.</p>
          </article>
          <article className="info-card">
            <p className="point-label">Feedback lane</p>
            <h3>Design and product feedback</h3>
            <p>Tell us what feels broken, slow, confusing, or worth expanding.</p>
          </article>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
