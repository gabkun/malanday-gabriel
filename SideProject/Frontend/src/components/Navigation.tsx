import React, { useState } from 'react';

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <>
    <nav className="bg-blue-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="text-white text-2xl font-bold">
              MyApp
            </a>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="/" className="text-white hover:text-gray-300">
              Home
            </a>
            <a href="/login" className="text-white hover:text-gray-300">
              About
            </a>
            <a href="/signup" className="text-white hover:text-gray-300">
              Services
            </a>
            <a href="#contact" className="text-white hover:text-gray-300">
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-500 space-y-2 p-4">
          <a
            href="#home"
            className="block text-white hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            Home
          </a>
          <a
            href="#about"
            className="block text-white hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            About
          </a>
          <a
            href="#services"
            className="block text-white hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            Services
          </a>
          <a
            href="#contact"
            className="block text-white hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </a>
        </div>
      )}
    </nav>
    </>
  )
}

export default Navigation