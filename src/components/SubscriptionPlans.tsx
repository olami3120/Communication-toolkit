import { useState } from 'react'

interface Plan {
  id: string
  name: string
  price: number
  features: string[]
  isPopular?: boolean
}

interface SubscriptionState {
  selectedPlan: string | null
  billingCycle: 'monthly' | 'yearly'
}

export const SubscriptionPlans = () => {
  const [subscriptionState, setSubscriptionState] = useState<SubscriptionState>({
    selectedPlan: null,
    billingCycle: 'monthly'
  })

  const plans: Plan[] = [
    {
      id: 'basic',
      name: 'Basic',
      price: 9.99,
      features: [
        'Up to 5 team members',
        'Basic task management',
        'Standard support',
        '1GB storage'
      ]
    },
    {
      id: 'pro',
      name: 'Professional',
      price: 19.99,
      features: [
        'Up to 20 team members',
        'Advanced task management',
        'Priority support',
        '5GB storage',
        'Analytics dashboard'
      ],
      isPopular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 49.99,
      features: [
        'Unlimited team members',
        'Full feature access',
        '24/7 support',
        'Unlimited storage',
        'Custom integrations',
        'Dedicated account manager'
      ]
    }
  ]

  const handlePlanSelect = (planId: string) => {
    setSubscriptionState(prev => ({ ...prev, selectedPlan: planId }))
  }

  const handleBillingCycleChange = (cycle: 'monthly' | 'yearly') => {
    setSubscriptionState(prev => ({ ...prev, billingCycle: cycle }))
  }

  const getDiscountedPrice = (price: number) => {
    return subscriptionState.billingCycle === 'yearly' ? price * 10 : price
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Subscription Plans
      </h2>

      {/* Billing Cycle Toggle */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-md shadow-sm">
          <button
            onClick={() => handleBillingCycleChange('monthly')}
            className={`px-4 py-2 text-sm font-medium rounded-l-md ${
              subscriptionState.billingCycle === 'monthly'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => handleBillingCycleChange('yearly')}
            className={`px-4 py-2 text-sm font-medium rounded-r-md ${
              subscriptionState.billingCycle === 'yearly'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Yearly (Save 20%)
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map(plan => (
          <div
            key={plan.id}
            className={`relative p-6 rounded-lg border ${
              plan.isPopular
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                : 'border-gray-200 dark:border-gray-700'
            }`}
          >
            {plan.isPopular && (
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-600 text-white">
                  Popular
                </span>
              </div>
            )}

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {plan.name}
            </h3>
            <div className="mb-4">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                ${getDiscountedPrice(plan.price)}
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                /{subscriptionState.billingCycle === 'monthly' ? 'month' : 'year'}
              </span>
            </div>

            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                  <svg
                    className="h-5 w-5 text-green-500 mr-2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handlePlanSelect(plan.id)}
              className={`w-full py-2 px-4 rounded-md ${
                subscriptionState.selectedPlan === plan.id
                  ? 'bg-green-600 text-white'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {subscriptionState.selectedPlan === plan.id ? 'Current Plan' : 'Select Plan'}
            </button>
          </div>
        ))}
      </div>

      {/* Additional Features */}
      <div className="mt-12">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Additional Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              Custom Integrations
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              Connect with your favorite tools and services
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              API Access
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              Build custom solutions with our API
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 