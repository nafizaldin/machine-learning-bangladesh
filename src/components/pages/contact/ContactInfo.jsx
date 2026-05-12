
import Image from "next/image";
import { FaFacebookSquare, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const contactDetails = [
  {
    icon: "/icons/contact/Envelope.svg",
    label: "info@mlbangladesh.org",
  },
  {
    icon: "/icons/contact/Vector.svg",
    label: "Bangladesh",
  },
];

const socialLinks = [
  { icon: <FaLinkedin />, href: "https://www.linkedin.com/company/ml-bangladesh/" },
  { icon: <FaFacebookSquare />, href: "https://www.facebook.com/MLBangladesh0" },
  // { icon: <FaInstagram />, href: "#" },
  // { icon: <FaSquareXTwitter />, href: "#" },
];

export default function ContactInfo() {
  return (
    <div className="left">
      <h2>
        Let&apos;s Connect &amp; <span style={{ color: '#4285F4' }}>Grow</span> <br /> Together.
      </h2>

      <div className="details">
        {contactDetails.map((item, index) => (
          <div key={index} className="data">
            <span className="text-xl">
              <Image src={item.icon} width={22} height={28} alt="" />
            </span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <div className="social-link">
        {socialLinks.map(({ icon, href }, index) => (
          <a key={index} href={href} target="_blank" rel="noopener noreferrer">
            <p className="icon">{icon}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
