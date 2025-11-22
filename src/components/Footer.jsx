// Footer.jsx
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left Section */}
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h3 className="text-lg font-semibold text-gray-800">StoreInventory</h3>
            <p className="text-gray-600 text-sm mt-1">
              Simple inventory management
            </p>
          </div>

          {/* Center Links */}
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="/about" className="text-gray-600 hover:text-blue-600 text-sm">
              About
            </a>
            <a href="/features" className="text-gray-600 hover:text-blue-600 text-sm">
              Features
            </a>
            <a href="/contact" className="text-gray-600 hover:text-blue-600 text-sm">
              Contact
            </a>
            <a href="/privacy" className="text-gray-600 hover:text-blue-600 text-sm">
              Privacy
            </a>
          </div>

          {/* Right Section */}
          <div className="text-center md:text-right">
            <p className="text-gray-500 text-sm">
              © {currentYear} StoreInventory
            </p>
            <p className="text-gray-400 text-xs mt-1">
              Built for modern businesses
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;