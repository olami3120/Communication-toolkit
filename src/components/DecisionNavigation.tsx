import { useState } from 'react'
import { useStore } from '../store'
import { Decision, DecisionOption, DecisionCriteria } from '../types'

export const DecisionNavigation = () => {
  const { addDecision } = useStore()
  const [step, setStep] = useState(1)
  const [decision, setDecision] = useState<Partial<Decision>>({
    title: '',
    description: '',
    options: [],
    criteria: [],
    status: 'pending',
  })
  const [currentOption, setCurrentOption] = useState<Partial<DecisionOption>>({
    title: '',
    description: '',
    scores: {},
  })
  const [currentCriteria, setCurrentCriteria] = useState<Partial<DecisionCriteria>>({
    title: '',
    weight: 5,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateStep = () => {
    const newErrors: Record<string, string> = {}
    
    if (step === 1) {
      if (!decision.title?.trim()) {
        newErrors.title = 'Title is required'
      }
      if (!decision.description?.trim()) {
        newErrors.description = 'Description is required'
      }
    } else if (step === 2) {
      if (!currentCriteria.title?.trim()) {
        newErrors.criteriaTitle = 'Criteria title is required'
      }
      if (currentCriteria.weight && (currentCriteria.weight < 1 || currentCriteria.weight > 10)) {
        newErrors.criteriaWeight = 'Weight must be between 1 and 10'
      }
    } else if (step === 3) {
      if (!currentOption.title?.trim()) {
        newErrors.optionTitle = 'Option title is required'
      }
      if (!currentOption.description?.trim()) {
        newErrors.optionDescription = 'Option description is required'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep()) {
      if (step === 1) {
        // Basic decision info is already saved in state
        setStep(2)
      } else if (step === 2) {
        // Add criteria
        if (currentCriteria.title && currentCriteria.weight) {
          setDecision(prev => ({
            ...prev,
            criteria: [...(prev.criteria || []), {
              id: crypto.randomUUID(),
              title: currentCriteria.title,
              weight: currentCriteria.weight,
            }],
          }))
          setCurrentCriteria({ title: '', weight: 5 })
        }
      } else if (step === 3) {
        // Add option
        if (currentOption.title && currentOption.description) {
          setDecision(prev => ({
            ...prev,
            options: [...(prev.options || []), {
              id: crypto.randomUUID(),
              title: currentOption.title,
              description: currentOption.description,
              scores: {},
            }],
          }))
          setCurrentOption({ title: '', description: '', scores: {} })
        }
      }
    }
  }

  const handlePrevious = () => {
    setStep(prev => prev - 1)
  }

  const handleSubmit = () => {
    if (validateStep()) {
      const newDecision: Decision = {
        id: crypto.randomUUID(),
        title: '',
        description: '',
        options: [],
        criteria: [],
        status: 'pending',
        version: 1,
        lastModified: new Date().toISOString(),
        collaborators: [],
        createdAt: new Date(),
        updatedAt: new Date()
      }
      addDecision(newDecision)
      // Reset form
      setDecision({
        title: '',
        description: '',
        options: [],
        criteria: [],
        status: 'pending',
      })
      setStep(1)
    }
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Decision Navigation
      </h2>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Step {step} of 4
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {step === 1 ? 'Basic Info' : 
             step === 2 ? 'Add Criteria' :
             step === 3 ? 'Add Options' : 'Review & Submit'}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Step 1: Basic Decision Info */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Decision Title
            </label>
            <input
              type="text"
              value={decision.title}
              onChange={(e) => setDecision(prev => ({ ...prev, title: e.target.value }))}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.title ? 'border-red-500' : ''
              }`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              value={decision.description}
              onChange={(e) => setDecision(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.description ? 'border-red-500' : ''
              }`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>
        </div>
      )}

      {/* Step 2: Add Criteria */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Criteria Title
            </label>
            <input
              type="text"
              value={currentCriteria.title}
              onChange={(e) => setCurrentCriteria(prev => ({ ...prev, title: e.target.value }))}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.criteriaTitle ? 'border-red-500' : ''
              }`}
            />
            {errors.criteriaTitle && (
              <p className="mt-1 text-sm text-red-600">{errors.criteriaTitle}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Weight (1-10)
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={currentCriteria.weight}
              onChange={(e) => setCurrentCriteria(prev => ({ ...prev, weight: Number(e.target.value) }))}
              className="mt-1 block w-full"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Current: {currentCriteria.weight}
            </p>
            {errors.criteriaWeight && (
              <p className="mt-1 text-sm text-red-600">{errors.criteriaWeight}</p>
            )}
          </div>

          {/* List of added criteria */}
          {decision.criteria && decision.criteria.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Added Criteria
              </h3>
              <div className="space-y-2">
                {decision.criteria.map((criteria) => (
                  <div
                    key={criteria.id}
                    className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded"
                  >
                    <span className="text-gray-700 dark:text-gray-300">
                      {criteria.title} (Weight: {criteria.weight})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 3: Add Options */}
      {step === 3 && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Option Title
            </label>
            <input
              type="text"
              value={currentOption.title}
              onChange={(e) => setCurrentOption(prev => ({ ...prev, title: e.target.value }))}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.optionTitle ? 'border-red-500' : ''
              }`}
            />
            {errors.optionTitle && (
              <p className="mt-1 text-sm text-red-600">{errors.optionTitle}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              value={currentOption.description}
              onChange={(e) => setCurrentOption(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.optionDescription ? 'border-red-500' : ''
              }`}
            />
            {errors.optionDescription && (
              <p className="mt-1 text-sm text-red-600">{errors.optionDescription}</p>
            )}
          </div>

          {/* List of added options */}
          {decision.options && decision.options.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Added Options
              </h3>
              <div className="space-y-2">
                {decision.options.map((option) => (
                  <div
                    key={option.id}
                    className="p-2 bg-gray-50 dark:bg-gray-700 rounded"
                  >
                    <h4 className="font-medium text-gray-700 dark:text-gray-300">
                      {option.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {option.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 4: Review & Submit */}
      {step === 4 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Decision Summary
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300">
                  {decision.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {decision.description}
                </p>
              </div>

              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Criteria
                </h4>
                <div className="space-y-2">
                  {decision.criteria?.map((criteria) => (
                    <div
                      key={criteria.id}
                      className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded"
                    >
                      <span className="text-gray-700 dark:text-gray-300">
                        {criteria.title}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Weight: {criteria.weight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Options
                </h4>
                <div className="space-y-2">
                  {decision.options?.map((option) => (
                    <div
                      key={option.id}
                      className="p-2 bg-gray-50 dark:bg-gray-700 rounded"
                    >
                      <h5 className="font-medium text-gray-700 dark:text-gray-300">
                        {option.title}
                      </h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {option.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="mt-8 flex justify-between">
        {step > 1 && (
          <button
            onClick={handlePrevious}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Previous
          </button>
        )}
        {step < 4 ? (
          <button
            onClick={handleNext}
            className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="ml-auto px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Create Decision
          </button>
        )}
      </div>
    </div>
  )
} 