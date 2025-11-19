import { useState } from 'react';

function Payment({ onBackToLogin, onPaymentSuccess }) {
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [paymentMethod, setPaymentMethod] = useState('gcash');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('plans');

  const plans = [
    {
      id: 'basic',
      name: 'Starter',
      price: 299,
      period: 'month',
      features: ['100 Products', 'Basic Reports', 'Email Support'],
      popular: false,
      badge: 'Good for small shops'
    },
    {
      id: 'pro',
      name: 'Professional',
      price: 599,
      period: 'month',
      features: ['1000 Products', 'Advanced Analytics', 'Priority Support', 'Barcode Scan'],
      popular: true,
      badge: 'Most Popular'
    },
    {
      id: 'enterprise',
      name: 'Business',
      price: 999,
      period: 'month',
      features: ['Unlimited Products', 'Custom Reports', 'Dedicated Support', 'API Access'],
      popular: false,
      badge: 'For growing businesses'
    }
  ];

  const paymentMethods = [
    {
      id: 'gcash',
      name: 'GCash',
      icon: '📱',
      description: 'Pay with your GCash wallet',
      instructions: 'You will be redirected to GCash to complete payment'
    },
    {
      id: 'card',
      name: 'Credit Card',
      icon: '💳',
      description: 'Visa, MasterCard, Amex',
      instructions: 'Enter your card details securely'
    },
    {
      id: 'paymaya',
      name: 'PayMaya',
      icon: '💙',
      description: 'Pay with PayMaya wallet',
      instructions: 'You will be redirected to PayMaya'
    }
  ];

  const handlePayment = async () => {
    setLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const paymentData = {
        plan: selectedPlan,
        paymentMethod: paymentMethod,
        amount: plans.find(p => p.id === selectedPlan)?.price,
        transactionId: `TX${Date.now()}`,
        paidAt: new Date().toISOString()
      };
      
      onPaymentSuccess(paymentData);
      
    } catch (error) {
      setError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const selectedPlanData = plans.find(p => p.id === selectedPlan);
  const selectedPaymentMethod = paymentMethods.find(m => m.id === paymentMethod);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        
        {/* Header */}
        <div className="bg-white border-b border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl">
                <span className="text-white text-lg">🏪</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Upgrade Your Store</h1>
                <p className="text-gray-500 text-sm">Choose plan & payment method</p>
              </div>
            </div>
            <button
              onClick={onBackToLogin}
              className="text-gray-400 hover:text-gray-600 transition p-2 hover:bg-gray-100 rounded-full"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 bg-gray-50">
          <button
            onClick={() => setActiveTab('plans')}
            className={`flex-1 py-4 text-sm font-medium transition ${
              activeTab === 'plans'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            📦 Plans
          </button>
          <button
            onClick={() => setActiveTab('payment')}
            className={`flex-1 py-4 text-sm font-medium transition ${
              activeTab === 'payment'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            💳 Payment
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          
          {activeTab === 'plans' && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Plan</h2>
                <p className="text-gray-600">Start with a 7-day free trial</p>
              </div>

              {plans.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    selectedPlan === plan.id
                      ? plan.popular
                        ? 'border-purple-500 bg-purple-50 shadow-lg scale-105'
                        : 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        ⭐ {plan.badge}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{plan.name}</h3>
                      <p className="text-gray-500 text-sm">{plan.badge}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">₱{plan.price}</div>
                      <div className="text-gray-500 text-sm">per month</div>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-700">
                        <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {selectedPlan === plan.id && (
                    <div className="mt-3 flex items-center justify-center text-blue-600 text-sm font-medium">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Selected
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Method</h2>
                <p className="text-gray-600">Choose how you want to pay</p>
              </div>

              {/* Selected Plan Summary */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 border border-blue-100">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-gray-900">{selectedPlanData?.name} Plan</h3>
                    <p className="text-gray-600 text-sm">Monthly subscription</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-gray-900">₱{selectedPlanData?.price}</div>
                    <div className="text-gray-500 text-sm">per month</div>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      paymentMethod === method.id
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-xl ${
                        paymentMethod === method.id ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        <span className="text-xl">{method.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{method.name}</h4>
                        <p className="text-gray-600 text-sm">{method.description}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === method.id
                          ? 'bg-blue-500 border-blue-500'
                          : 'border-gray-300'
                      }`}>
                        {paymentMethod === method.id && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>
                    {paymentMethod === method.id && (
                      <p className="text-blue-600 text-sm mt-2 ml-14">{method.instructions}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Security Badge */}
              <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                <div className="flex items-center justify-center space-x-2 text-green-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-sm font-medium">Your payment is secure and encrypted</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="px-6">
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Footer with Payment Button */}
        <div className="bg-gray-50 border-t border-gray-100 p-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center text-lg">
              <span className="text-gray-600">Total:</span>
              <span className="text-2xl font-bold text-gray-900">₱{selectedPlanData?.price}</span>
            </div>
            
            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Processing Payment...</span>
                </>
              ) : (
                <>
                  <span>Pay Now</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
            
            <p className="text-center text-gray-500 text-xs">
              You can cancel your subscription anytime
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment