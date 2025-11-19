import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import UserDashboard from './pages/UserDashboard.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [currentView, setCurrentView] = useState('header') // 'header', 'login', 'signup'
  const [paymentData, setPaymentData] = useState(null)

  useEffect(() => {
    // Check if user is logged in on component mount
    checkAuthStatus()
  }, [])

  const checkAuthStatus = () => {
    const token = localStorage.getItem('access_token')
    const userData = localStorage.getItem('user')
    
    if (token && userData) {
      setIsAuthenticated(true)
      setUser(JSON.parse(userData))
      setCurrentView('dashboard')
    } else {
      setIsAuthenticated(false)
      setUser(null)
      setCurrentView('header')
    }
  }

  const handleLoginSuccess = () => {
    checkAuthStatus()
    setCurrentView('dashboard')
  }

  // Updated to accept payment data from Login component
  const handleSignupClick = (paymentData = null) => {
    setPaymentData(paymentData)
    setCurrentView('signup')
  }

  const handleSignupSuccess = () => {
    checkAuthStatus()
    setCurrentView('dashboard')
  }

  const handleBackToHeader = () => {
    setCurrentView('header')
  }

  const handleLogout = () => {
    localStorage.clear()
    setIsAuthenticated(false)
    setUser(null)
    setCurrentView('header')
    setPaymentData(null)
  }

  // Render different views based on currentView state
  const renderCurrentView = () => {
    if (isAuthenticated) {
      return <UserDashboard onLogout={handleLogout} />
    }

    switch (currentView) {
      case 'header':
        return (
          <Header 
            onLoginClick={() => setCurrentView('login')}
            onSignupClick={() => handleSignupClick()} // No payment data for header signup
            onLoginSuccess={handleLoginSuccess}
          />
        )
      case 'login':
        return (
          <Login 
            onSwitchToSignup={handleSignupClick} // Passes payment data when called
            onClose={handleBackToHeader}
            onLoginSuccess={handleLoginSuccess}
          />
        )
      case 'signup':
        return (
          <Signup 
            onSwitchToLogin={() => setCurrentView('login')}
            onClose={handleBackToHeader}
            onSignupSuccess={handleSignupSuccess}
            paymentData={paymentData}
          />
        )
      default:
        return (
          <Header 
            onLoginClick={() => setCurrentView('login')}
            onSignupClick={() => handleSignupClick()}
            onLoginSuccess={handleLoginSuccess}
          />
        )
    }
  }

  return (
    <div>
      {renderCurrentView()}
    </div>
  )
}

export default App