import React from 'react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-600 shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-white font-bold text-2xl tracking-wider">
              Hotel<span className="text-yellow-400">GO!</span>
            </a>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#home" className="text-white hover:text-yellow-400 transition duration-300">
              Home
            </a>
            <a href="#about" className="text-white hover:text-yellow-400 transition duration-300">
              About
            </a>
            <a href="#services" className="text-white hover:text-yellow-400 transition duration-300">
              Services
            </a>
            <a href="#contact" className="text-white hover:text-yellow-400 transition duration-300">
              Contact
            </a>
            {/* Login & Signup Buttons */}
            <div className="flex space-x-4">
              <a
                href="/login"
                className="px-4 py-2 border border-yellow-400 text-yellow-400 rounded hover:bg-yellow-400 hover:text-blue-900 transition duration-300"
              >
                Login
              </a>
              <a
                href="/signup"
                className="px-4 py-2 bg-yellow-400 text-blue-900 rounded hover:bg-yellow-500 hover:text-white transition duration-300"
              >
                Signup
              </a>
            </div>
          </div>
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-yellow-400 focus:outline-none"
            >
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-blue-800 text-center py-4 space-y-4">
          <a href="#home" className="block text-white hover:text-yellow-400 transition duration-300">
            Home
          </a>
          <a href="#about" className="block text-white hover:text-yellow-400 transition duration-300">
            About
          </a>
          <a href="#services" className="block text-white hover:text-yellow-400 transition duration-300">
            Services
          </a>
          <a href="#contact" className="block text-white hover:text-yellow-400 transition duration-300">
            Contact
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;