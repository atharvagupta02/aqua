import React from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaEnvelope,
  FaArrowUp,
} from "react-icons/fa";
import logo from "./photos/logodesign.png";

export default function Footer() {
  const exploreLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/About" },
    { name: "Shop", path: "/all_products" },
    { name: "Blog", path: "/all_blogs" },
  ];

  const supportLinks = [
    { name: "Consultation", path: "/Consultation" },
    { name: "Contact Us", path: "/Contact" },
    { name: "Refund Policy", path: "/Refundpolicies" },
  ];

  const legalLinks = [
    { name: "Terms & Conditions", path: "/Terms&condition" },
    { name: "Privacy Policy", path: "/PrivacyPolicy" },
  ];

  const socialLinks = [
    {
      name: "Instagram",
      icon: <FaInstagram />,
      href: "https://www.instagram.com/aquahariofficial/?utm_source=ig_web_button_share_sheet",
    },
    {
      name: "YouTube",
      icon: <FaYoutube />,
      href: "https://youtube.com/@aquahariofficial?si=sVgwYZDylTajIyE6",
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp />,
      href: "https://wa.me/919044634523",
    },
    {
      name: "Email",
      icon: <FaEnvelope />,
      href: "mailto:aquahariofficial@gmail.com",
    },
  ];

  return (
    <footer className="w-full border-t border-white/10 bg-[#030712] text-gray-300">
<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">

{/* Brand */}
<div className="lg:col-span-1">
  <Link to="/" className="inline-block">
    <img
      src={logo}
      alt="AquaHari"
      className="h-14 w-auto object-contain"
    />
  </Link>

  <div className="mt-4 space-y-1 text-sm leading-6 text-gray-400">
    <p>Expert online consultation for Exotic pet care.</p>

    <p>
      Premium IAL (Indian Almond Leaf) extracts for a healthy,
      stress-free aquarium.
    </p>
  </div>

  <div className="mt-5 flex items-center gap-3">
    {socialLinks.map((social) => (
      <a
        key={social.name}
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={social.name}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition hover:border-cyan-400/60 hover:bg-cyan-400/10 hover:text-cyan-400"
      >
        {social.icon}
      </a>
    ))}
  </div>

  <a
    href="mailto:aquahariofficial@gmail.com"
    className="mt-4 inline-flex items-center gap-2 text-xs text-gray-400 transition hover:text-cyan-400"
  >
    aquahariofficial@gmail.com
  </a>
</div>

{/* Explore */}
<FooterColumn title="Explore" links={exploreLinks} />

{/* Pet Categories - Plain Text */}
<div>
  <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white">
    Pet Categories
  </h3>

  <ul className="space-y-2.5 text-sm text-gray-400">
    <li>🐠 Fish</li>
    <li>🐢 Turtles</li>
    <li>🦎 Reptiles</li>
    <li>🐹 Hamsters</li>
    <li>🦎 Bearded Dragons</li>
    <li>🦎 Iguanas</li>
    <li>🐾 Other Exotic Pets</li>
  </ul>
</div>

{/* Support */}
<FooterColumn title="Support" links={supportLinks} />

{/* Information */}
<FooterColumn title="Information" links={legalLinks} />

</div>
    </footer>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white">
        {title}
      </h3>

      <ul className="space-y-2.5 text-sm">
        {links.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              className="text-gray-400 transition hover:text-cyan-400"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}