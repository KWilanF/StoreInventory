import { useState } from 'react'

function Login({ onSwitchToSignup, onClose, onLoginSuccess }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPayment, setShowPayment] = useState(false)
  const [paymentData, setPaymentData] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://storeinventory-backend.onrender.com'
      
      const response = await fetch(`${API_BASE_URL}/api/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.email,
          password: formData.password
        }),
      })

      const data = await response.json()
      
      if (response.ok) {
        console.log('Login successful:', data)
        
        localStorage.setItem('access_token', data.access)
        localStorage.setItem('refresh_token', data.refresh)
        localStorage.setItem('user', JSON.stringify(data.user))
        
        onLoginSuccess()
        
      } else {
        setError(data.detail || data.error || 'Login failed. Please check your credentials.')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('Cannot connect to server. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const handleSignupClick = () => {
    setShowPayment(true)
  }

  const handlePaymentSuccess = (paymentData) => {
    console.log('Payment successful:', paymentData)
    setPaymentData(paymentData)
    setShowPayment(false)
    onSwitchToSignup(paymentData)
  }

  const handleBackToLogin = () => {
    setShowPayment(false)
  }

  // Updated PaymentModal component with mobile-first design
  const PaymentModal = () => {
    const [selectedPlan, setSelectedPlan] = useState('basic')
    const [paymentMethod, setPaymentMethod] = useState('gcash')
    const [paymentLoading, setPaymentLoading] = useState(false)
    const [paymentError, setPaymentError] = useState('')

    const plans = [
      {
        id: 'basic',
        name: 'Basic',
        price: 299,
        period: 'month',
        features: [
          '100 products',
          'Basic inventory',
          'Sales reports',
          'Email support'
        ]
      },
      {
        id: 'pro',
        name: 'Pro',
        price: 599,
        period: 'month',
        features: [
          '1000 products',
          'Advanced tracking',
          'Sales analytics',
          'Priority support',
          'Barcode scanning'
        ],
        popular: true
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        price: 999,
        period: 'month',
        features: [
          'Unlimited products',
          'Advanced analytics',
          'Dedicated support',
          'Custom integrations',
          'API access'
        ]
      }
    ]

    const handlePayment = async () => {
      setPaymentLoading(true)
      setPaymentError('')

      try {
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        const paymentData = {
          plan: selectedPlan,
          paymentMethod: paymentMethod,
          amount: plans.find(p => p.id === selectedPlan)?.price,
          transactionId: `TX${Date.now()}`,
          paidAt: new Date().toISOString()
        }
        
        handlePaymentSuccess(paymentData)
        
      } catch (error) {
        setPaymentError('Payment failed. Please try again.')
      } finally {
        setPaymentLoading(false)
      }
    }

    const selectedPlanData = plans.find(p => p.id === selectedPlan)

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 z-50">
        <div className="bg-white rounded-xl w-full max-w-sm max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-lg font-bold text-gray-900">Choose Plan</h1>
                <p className="text-gray-600 text-sm">Select your subscription</p>
              </div>
              <button
                onClick={handleBackToLogin}
                className="text-gray-400 hover:text-gray-600 transition p-1"
                disabled={paymentLoading}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Plans - Stack vertically on mobile */}
            <div className="space-y-3">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`border-2 rounded-lg p-3 cursor-pointer transition-all ${
                    selectedPlan === plan.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  } ${plan.popular ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.popular && (
                    <div className="text-center mb-2">
                      <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-gray-900">{plan.name}</h3>
                      <div className="flex items-baseline mt-1">
                        <span className="text-xl font-bold text-gray-900">₱{plan.price}</span>
                        <span className="text-gray-600 text-sm ml-1">/month</span>
                      </div>
                    </div>
                    {selectedPlan === plan.id && (
                      <div className="bg-blue-600 text-white p-1 rounded-full">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  <ul className="space-y-1 text-xs text-gray-600">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <svg className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Payment Method */}
            <div>
              <h3 className="text-sm font-semibold mb-3 text-gray-900">Payment Method</h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setPaymentMethod('gcash')}
                  className={`p-3 rounded-lg border-2 text-left transition-all ${
                    paymentMethod === 'gcash' 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">📱</span>
                    <div>
                      <div className="font-medium text-sm text-gray-900">GCash</div>
                      <div className="text-xs text-gray-600">Mobile wallet</div>
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-lg border-2 text-left transition-all ${
                    paymentMethod === 'card' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">💳</span>
                    <div>
                      <div className="font-medium text-sm text-gray-900">Card</div>
                      <div className="text-xs text-gray-600">Visa, MasterCard</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Error Message */}
            {paymentError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-red-600 text-sm">{paymentError}</p>
                </div>
              </div>
            )}
          </div>

          {/* Fixed Bottom Section */}
          <div className="border-t bg-white p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-600">Total:</span>
              <span className="text-lg font-bold text-gray-900">₱{selectedPlanData?.price}</span>
            </div>
            
            <button
              onClick={handlePayment}
              disabled={paymentLoading}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition font-semibold text-base disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {paymentLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Pay ₱{selectedPlanData?.price}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
            
            <p className="text-center text-gray-500 text-xs mt-2">
              Create account after payment
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Login Modal */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="w-full max-w-sm mx-4">
          <div className="bg-white rounded-2xl shadow-xl">
             <img
                src="/logo.png"
                alt="Store Inventory Logo"
                className="h-10 w-auto mt-50"
              />
            {/* Close Button */}
            <div className="flex justify-end pt-4 pr-4">
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition"
                disabled={loading}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-6 pb-6">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">            Store Inventory</h1>
                <h2 className="text-2xl font-bold text-gray-900">Sign in to your account</h2>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      disabled={loading}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:opacity-50"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      disabled={loading}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:opacity-50"
                      placeholder="Enter your password"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      disabled={loading}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Signing in...
                      </div>
                    ) : (
                      'Sign in'
                    )}
                  </button>
                  <p className="mt-2 text-sm text-gray-600">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={handleSignupClick}
                      className="font-medium text-blue-600 hover:text-blue-500 transition"
                      disabled={loading}
                    >
                      Sign up
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && <PaymentModal />}
    </>
  )
}

export default Login