import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";


export default function Contact() {
  return (
    <main className="  ca-contact-info  ">
        <h1>Connect, collaborate, create!</h1>
      <section className="ca-contact">
        <div className="center bg-light">
      <ContactInfo />
      <ContactForm />
      </div>
      </section>
    </main>
  );
}