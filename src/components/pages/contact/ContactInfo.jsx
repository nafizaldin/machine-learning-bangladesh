
import Image from "next/image";
import { FaFacebookSquare, FaInstagram, FaLinkedin, FaSquare, FaWhatsappSquare } from "react-icons/fa";
import { FaSquareUpwork } from "react-icons/fa6";

const contactDetails = [
  {
    icon: "/icons/contact/Envelope.svg",
    label: "info.codelign@gmail.com",
  },
  {
    icon: "/icons/contact/Telephone.svg",
    label: "+8801912015611",
  },
  {
    icon: "/icons/contact/Vector.svg",
    label: "House- 35, Road- 5, Sector- 7, Uttara, Dhaka- 1230",
  },
];

 const socialLinks = [
  { icon: <FaLinkedin />, href: "https://www.linkedin.com/company/codealign-co/" },
  { icon: <FaFacebookSquare />, href: "https://www.facebook.com/share/18JWqY7M33/" },
  { icon: <FaInstagram />, href: "https://www.instagram.com/codealign_co?igsh=MWN1ZmNibG10c2k5MA==" },
  {icon: <FaSquareUpwork/>, href: "https://www.upwork.com/agencies/1861859466591423668/" },
  {icon:<FaWhatsappSquare/>, href:"https://wa.me/+8801912015611" }
];

export default function ContactInfo() {
  return (
    <div className="left">
      <h2>
        Let’s Discuss On <span className="gradient-text">Something</span> Cool <br/> Together.
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