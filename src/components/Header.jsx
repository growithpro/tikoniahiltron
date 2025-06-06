import React, { useState } from "react";
import { LinkIcon, Menu, X } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom"; // Assuming you're using react-router for navigation
import DarkModeToggle from "./DarkModeToggle";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-white/20 shadow-md border-b border-white/30">
      <div className="px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16 w-full">
        {/* Logo */}
        <div className="text-xl font-bold text-gray-800">ITDA(Hiltron Calc) Tikonia Centre</div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 text-gray-700">
          <Link to="/" className="px-4 py-2 rounded-full transition duration-300 text-gray-800 hover:bg-indigo-100 hover:text-indigo-700">
            Home
          </Link>
          <Link to="/teachers" className="px-4 py-2 rounded-full transition duration-300 text-gray-800 hover:bg-indigo-100 hover:text-indigo-700">
            Teachers
          </Link>
          <Link to="/courses" className="px-4 py-2 rounded-full transition duration-300 text-gray-800 hover:bg-indigo-100 hover:text-indigo-700">
            Courses
          </Link>
          <Link to="/contact" className="px-4 py-2 rounded-full transition duration-300 text-gray-800 hover:bg-indigo-100 hover:text-indigo-700">
            Contact
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            Login
            <ArrowRight size={16} />
          </Link>
        </nav>
        <DarkModeToggle />
        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <nav className="flex flex-col space-y-2 text-gray-700">
            <Link to="/" className="hover:text-blue-600">
              Home
            </Link>
            <Link to="/teachers" className="hover:text-blue-600">
              Teachers
            </Link>
            <Link to="/courses" className="hover:text-blue-600">
              Courses
            </Link>
            <Link to="/contact" className="hover:text-blue-600">
              Contact
            </Link>
            <Link to="/dashboard" className="hover:text-blue-600">
              Dashboard
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
