import { useState } from 'react'
import { useStore } from '../store'
import { Feedback } from '../types'
import { v4 as uuidv4 } from 'uuid'

export const FeedbackLoop = () => {
  const { addFeedback } = useStore()
  const [step, setStep] = useState(1)
  const [feedback, setFeedback] = useState<Partial<Feedback>>({
    title: '',
    description: '',
    type: 'improvement',
    priority: 'medium',
    actionItems: [],
    status: 'pending',
  })
  const [currentAction, setCurrentAction] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateStep = () => {
    const newErrors: Record<string, string> = {}
    
    if (step === 1) {
      if (!feedback.title?.trim()) {
        newErrors.title = 'Title is required'
      }
      if (!feedback.description?.trim()) {
        newErrors.description = 'Description is required'
      }
    } else if (step === 2) {
      if (!currentAction.trim()) {
        newErrors.action = 'Action item is required'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep()) {
      if (step === 1) {
        // Basic feedback info is already saved in state
        setStep(2)
      } else if (step === 2) {
        // Add action item
        if (currentAction) {
          setFeedback(prev => ({
            ...prev,
            actionItems: [...(prev.actionItems || []), currentAction],
          }))
          setCurrentAction('')
        }
      }
    }
  }

  const handlePrevious = () => {
    setStep(prev => prev - 1)
  }

  const handleSubmit = () => {
    if (validateStep()) {
      const newFeedback: Feedback = {
        id: uuidv4(),
        title: feedback.title!,
        description: feedback.description!,
        type: feedback.type!,
        priority: feedback.priority!,
        content: feedback.description!,
        actionItems: feedback.actionItems!,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      addFeedback(newFeedback)
      // Reset form
      setFeedback({
        title: '',
        description: '',
        type: 'improvement',
        priority: 'medium',
        actionItems: [],
        status: 'pending',
      })
      setStep(1)
    }
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Feedback Loop System
      </h2>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Step {step} of 3
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {step === 1 ? 'Basic Info' : 
             step === 2 ? 'Action Items' : 'Review & Submit'}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Step 1: Basic Feedback Info */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Feedback Title
            </label>
            <input
              type="text"
              value={feedback.title}
              onChange={(e) => setFeedback(prev => ({ ...prev, title: e.target.value }))}
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
              value={feedback.description}
              onChange={(e) => setFeedback(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.description ? 'border-red-500' : ''
              }`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Feedback Type
              </label>
              <select
                value={feedback.type}
                onChange={(e) => setFeedback(prev => ({ ...prev, type: e.target.value as Feedback['type'] }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="improvement">Improvement</option>
                <option value="praise">Praise</option>
                <option value="concern">Concern</option>
                <option value="suggestion">Suggestion</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Priority
              </label>
              <select
                value={feedback.priority}
                onChange={(e) => setFeedback(prev => ({ ...prev, priority: e.target.value as Feedback['priority'] }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Action Items */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Action Item
            </label>
            <textarea
              value={currentAction}
              onChange={(e) => setCurrentAction(e.target.value)}
              rows={3}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.action ? 'border-red-500' : ''
              }`}
            />
            {errors.action && (
              <p className="mt-1 text-sm text-red-600">{errors.action}</p>
            )}
          </div>

          {/* List of added action items */}
          {feedback.actionItems && feedback.actionItems.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Planned Action Items
              </h3>
              <div className="space-y-2">
                {feedback.actionItems.map((action, index) => (
                  <div
                    key={index}
                    className="p-2 bg-gray-50 dark:bg-gray-700 rounded"
                  >
                    <p className="text-gray-700 dark:text-gray-300">
                      {index + 1}. {action}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 3: Review & Submit */}
      {step === 3 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Feedback Summary
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300">
                  {feedback.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {feedback.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-700 dark:text-gray-300">
                    Type
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 capitalize">
                    {feedback.type}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 dark:text-gray-300">
                    Priority
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 capitalize">
                    {feedback.priority}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Action Items
                </h4>
                <div className="space-y-2">
                  {feedback.actionItems?.map((action, index) => (
                    <div
                      key={index}
                      className="p-2 bg-gray-50 dark:bg-gray-700 rounded"
                    >
                      <p className="text-gray-700 dark:text-gray-300">
                        {index + 1}. {action}
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
        {step < 3 ? (
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
            Submit Feedback
          </button>
        )}
      </div>
    </div>
  )
} 