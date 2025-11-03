import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import UserDashboard from './pages/UserDashboard.jsx'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

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
    } else {
      setIsAuthenticated(false)
      setUser(null)
    }
  }

  const handleLoginSuccess = () => {
    checkAuthStatus()
  }

  const handleLogout = () => {
    localStorage.clear()
    setIsAuthenticated(false)
    setUser(null)
  }

  return (
    <div>
      {isAuthenticated ? (
        <UserDashboard />
      ) : (
        <Header onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  )
}

export default App