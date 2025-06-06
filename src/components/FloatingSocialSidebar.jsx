import React from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

const socialLinks = [
  {
    icon: <FaInstagram />,
    url: "https://instagram.com/yourprofile",
    color: "hover:text-pink-500",
  },
  {
    icon: <FaFacebookF />,
    url: "https://facebook.com/yourprofile",
    color: "hover:text-blue-600",
  },
  {
    icon: <FaWhatsapp />,
    url: "https://wa.me/919876543210",
    color: "hover:text-green-500",
  },
  {
    icon: <FaLinkedinIn />,
    url: "https://linkedin.com/in/yourprofile",
    color: "hover:text-blue-700",
  },
  {
    icon: <FaYoutube />,
    url: "https://youtube.com/yourchannel",
    color: "hover:text-red-600",
  },
];

const FloatingSocialSidebar = () => {
  return (
    <div className="fixed top-1/3 left-2 z-50 flex flex-col space-y-4">
      {socialLinks.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-white dark:text-gray-300 text-xl p-3 bg-gray-800 dark:bg-gray-900 rounded-full shadow-md transition-transform transform hover:scale-110 ${link.color}`}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
};

export default FloatingSocialSidebar;
