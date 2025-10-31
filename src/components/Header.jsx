import { useState } from 'react'
import Login from '../pages/Login'  // Import your Login component
import Signup from '../pages/Signup'  // Import your Signup component

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [authModal, setAuthModal] = useState(null) // null, 'login', or 'signup'

  const handleLoginClick = () => {
    setAuthModal('login')
    setIsMenuOpen(false) // Close mobile menu when opening login
  }

  const handleCloseAuth = () => {
    setAuthModal(null)
  }

  const handleSwitchToSignup = () => {
    setAuthModal('signup')
  }

  const handleSwitchToLogin = () => {
    setAuthModal('login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <img
                src="/logo.png"
                alt="Store Inventory Logo"
                className="h-10 w-auto"
              />
              <h1 className="text-xl font-bold text-gray-800">
                Store Inventory
              </h1>
            </div>

            {/* Desktop Navigation Links - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#dashboard" className="text-gray-700 hover:text-blue-600 font-medium transition">
                Dashboard
              </a>
              <a href="#products" className="text-gray-700 hover:text-blue-600 font-medium transition">
                Products
              </a>
              <a href="#categories" className="text-gray-700 hover:text-blue-600 font-medium transition">
                Categories
              </a>
              <a href="#reports" className="text-gray-700 hover:text-blue-600 font-medium transition">
                Reports
              </a>
              <button 
                onClick={handleLoginClick}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
              >
                Login
              </button>
            </div>

            {/* Mobile menu button - Visible only on mobile */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-gray-600"
              >
                {/* Hamburger Icon */}
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu - Hidden by default, shows when menu is open */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                <a
                  href="#dashboard"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md font-medium"
                >
                  Dashboard
                </a>
                <a
                  href="#products"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md font-medium"
                >
                  Products
                </a>
                <a
                  href="#categories"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md font-medium"
                >
                  Categories
                </a>
                <a
                  href="#reports"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md font-medium"
                >
                  Reports
                </a>
                <button 
                  onClick={handleLoginClick}
                  className="w-full text-left px-3 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-md font-medium"
                >
                  Login
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Auth Modals */}
      {authModal === 'login' && (
        <Login 
          onSwitchToSignup={handleSwitchToSignup}
          onClose={handleCloseAuth}
        />
      )}

      {authModal === 'signup' && (
        <Signup 
          onSwitchToLogin={handleSwitchToLogin}
          onClose={handleCloseAuth}
        />
      )}
    </div>
  )
}

export default Header