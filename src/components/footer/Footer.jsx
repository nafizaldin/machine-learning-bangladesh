'use client';
import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import { FaFacebookSquare, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { HiMail, HiLocationMarker } from "react-icons/hi";
import { toast } from 'react-toastify';
import { useSnapshot } from 'valtio';
import utilStore from '@/store/utilStore';


const Footer = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const utilsSnap = useSnapshot(utilStore);
  const [email, setEmail] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.match(emailRegex)) {
      toast.error("Please enter a valid email address");
      return;
    }
    const [result, error] = await utilStore.createNewNewsletterSubscriber({ email });
    if (error) { toast.error("Subscription failed"); return; }
    if (result?.message) toast.success(result.message);
    else toast.success("Subscribed successfully!");
    setEmail("");
  };

  return (
    <footer className="ca-footer component-gap-y component-gap-x bg-light">
      <div className="footer-wrapper py-20">

        <div className="col-1">
          <div className="r-1">
            <Image src="/logo.png" alt="ML Bangladesh" width={150} height={44} className="object-contain h-9 w-auto" />
          </div>
          <div className="r-2">
            <p>
              A community dedicated to making AI and Machine Learning accessible to everyone across Bangladesh. Part of the Google AI Community Network.
            </p>
          </div>
          <div className="r-3">
            <h5>Stay Updated</h5>
            <p>Get weekly updates on events, workshops, and AI trends.</p>
            <form className="newsletter-form" onSubmit={onSubmit}>
              <input
                type="email"
                placeholder="Enter your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="btn-primary">Subscribe</button>
            </form>
          </div>
          <div className="r-4 text-secondary">
            <Link href="https://www.facebook.com/MLBangladesh0" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookSquare />
            </Link>
            <Link href="https://www.linkedin.com/company/ml-bangladesh" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </Link>
            {/* <Link href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </Link> */}
            {/* <Link href="#" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter">
              <FaSquareXTwitter />
            </Link> */}
          </div>
        </div>

        <div className="col-2">
          <h4>Quick Links</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about-us">About</Link></li>
            <li><Link href="/events">Events</Link></li>
            <li><Link href="/blogs">Blogs</Link></li>
            <li><Link href="/resources">Resources</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="col-3">
          <h4>Get In Touch</h4>
          <ul>
            <li>
              <HiLocationMarker className="text-[#4285F4]" />
              <Link href="#">
                <p>Bangladesh</p>
              </Link>
            </li>
            <li>
              <HiMail className="text-[#4285F4]" />
              <Link href="mailto:info@mlbangladesh.org">info@mlbangladesh.org</Link>
            </li>
          </ul>

          <div className="mt-8">
            <h4 className="mb-4">Member Of</h4>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 bg-white border border-[#dadce0] text-[#202124] text-sm font-medium px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-[#4285F4] inline-block"></span>
                Google AI Community
              </span>
            </div>
          </div>
        </div>

      </div>

      <div className="copyright">
        <hr className="white-line" />
        <p>Copyright &copy; 2025 Machine Learning Bangladesh &mdash; Founded September 2023</p>
        <p className="text-sm sm:text-base">
          Powered by <a href="https://codealign.co" target="_blank" rel="nofollow noreferrer" className="font-semibold text-current hover:underline hover:text-[#4285f4] transition-colors">CodeAlign</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
