import { useState } from 'react'
import { useStore } from '../store'
import { Conflict } from '../types'

export const ConflictResolution = () => {
  const { addConflict } = useStore()
  const [step, setStep] = useState(1)
  const [conflict, setConflict] = useState<Partial<Conflict>>({
    title: '',
    description: '',
    parties: [],
    rootCauses: [],
    resolutionSteps: [],
    status: 'pending',
  })
  const [currentParty, setCurrentParty] = useState('')
  const [currentCause, setCurrentCause] = useState('')
  const [currentStep, setCurrentStep] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateStep = () => {
    const newErrors: Record<string, string> = {}
    
    if (step === 1) {
      if (!conflict.title?.trim()) {
        newErrors.title = 'Title is required'
      }
      if (!conflict.description?.trim()) {
        newErrors.description = 'Description is required'
      }
    } else if (step === 2) {
      if (!currentParty.trim()) {
        newErrors.party = 'Party name is required'
      }
    } else if (step === 3) {
      if (!currentCause.trim()) {
        newErrors.cause = 'Root cause is required'
      }
    } else if (step === 4) {
      if (!currentStep.trim()) {
        newErrors.step = 'Resolution step is required'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep()) {
      if (step === 1) {
        // Basic conflict info is already saved in state
        setStep(2)
      } else if (step === 2) {
        // Add party
        if (currentParty) {
          setConflict(prev => ({
            ...prev,
            parties: [...(prev.parties || []), currentParty],
          }))
          setCurrentParty('')
        }
      } else if (step === 3) {
        // Add root cause
        if (currentCause) {
          setConflict(prev => ({
            ...prev,
            rootCauses: [...(prev.rootCauses || []), currentCause],
          }))
          setCurrentCause('')
        }
      } else if (step === 4) {
        // Add resolution step
        if (currentStep) {
          setConflict(prev => ({
            ...prev,
            resolutionSteps: [...(prev.resolutionSteps || []), currentStep],
          }))
          setCurrentStep('')
        }
      }
    }
  }

  const handlePrevious = () => {
    setStep(prev => prev - 1)
  }

  const handleSubmit = () => {
    if (validateStep()) {
      const newConflict: Conflict = {
        id: crypto.randomUUID(),
        title: conflict.title!,
        description: conflict.description!,
        parties: conflict.parties || [],
        rootCauses: conflict.rootCauses || [],
        resolutionSteps: conflict.resolutionSteps || [],
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      addConflict(newConflict)
      // Reset form
      setConflict({
        title: '',
        description: '',
        parties: [],
        rootCauses: [],
        resolutionSteps: [],
        status: 'pending',
      })
      setStep(1)
    }
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Conflict Resolution Roadmap
      </h2>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Step {step} of 5
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {step === 1 ? 'Basic Info' : 
             step === 2 ? 'Identify Parties' :
             step === 3 ? 'Root Causes' :
             step === 4 ? 'Resolution Steps' : 'Review & Submit'}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Step 1: Basic Conflict Info */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Conflict Title
            </label>
            <input
              type="text"
              value={conflict.title}
              onChange={(e) => setConflict(prev => ({ ...prev, title: e.target.value }))}
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
              value={conflict.description}
              onChange={(e) => setConflict(prev => ({ ...prev, description: e.target.value }))}
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

      {/* Step 2: Identify Parties */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Party Name
            </label>
            <input
              type="text"
              value={currentParty}
              onChange={(e) => setCurrentParty(e.target.value)}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.party ? 'border-red-500' : ''
              }`}
            />
            {errors.party && (
              <p className="mt-1 text-sm text-red-600">{errors.party}</p>
            )}
          </div>

          {/* List of added parties */}
          {conflict.parties && conflict.parties.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Identified Parties
              </h3>
              <div className="space-y-2">
                {conflict.parties.map((party, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded"
                  >
                    <span className="text-gray-700 dark:text-gray-300">
                      {party}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 3: Root Causes */}
      {step === 3 && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Root Cause
            </label>
            <textarea
              value={currentCause}
              onChange={(e) => setCurrentCause(e.target.value)}
              rows={3}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.cause ? 'border-red-500' : ''
              }`}
            />
            {errors.cause && (
              <p className="mt-1 text-sm text-red-600">{errors.cause}</p>
            )}
          </div>

          {/* List of added root causes */}
          {conflict.rootCauses && conflict.rootCauses.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Identified Root Causes
              </h3>
              <div className="space-y-2">
                {conflict.rootCauses.map((cause, index) => (
                  <div
                    key={index}
                    className="p-2 bg-gray-50 dark:bg-gray-700 rounded"
                  >
                    <p className="text-gray-700 dark:text-gray-300">
                      {cause}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 4: Resolution Steps */}
      {step === 4 && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Resolution Step
            </label>
            <textarea
              value={currentStep}
              onChange={(e) => setCurrentStep(e.target.value)}
              rows={3}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.step ? 'border-red-500' : ''
              }`}
            />
            {errors.step && (
              <p className="mt-1 text-sm text-red-600">{errors.step}</p>
            )}
          </div>

          {/* List of added resolution steps */}
          {conflict.resolutionSteps && conflict.resolutionSteps.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Planned Resolution Steps
              </h3>
              <div className="space-y-2">
                {conflict.resolutionSteps.map((step, index) => (
                  <div
                    key={index}
                    className="p-2 bg-gray-50 dark:bg-gray-700 rounded"
                  >
                    <p className="text-gray-700 dark:text-gray-300">
                      {index + 1}. {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 5: Review & Submit */}
      {step === 5 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Conflict Resolution Summary
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300">
                  {conflict.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {conflict.description}
                </p>
              </div>

              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Involved Parties
                </h4>
                <div className="space-y-2">
                  {conflict.parties?.map((party, index) => (
                    <div
                      key={index}
                      className="p-2 bg-gray-50 dark:bg-gray-700 rounded"
                    >
                      <span className="text-gray-700 dark:text-gray-300">
                        {party}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Root Causes
                </h4>
                <div className="space-y-2">
                  {conflict.rootCauses?.map((cause, index) => (
                    <div
                      key={index}
                      className="p-2 bg-gray-50 dark:bg-gray-700 rounded"
                    >
                      <p className="text-gray-700 dark:text-gray-300">
                        {cause}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Resolution Steps
                </h4>
                <div className="space-y-2">
                  {conflict.resolutionSteps?.map((step, index) => (
                    <div
                      key={index}
                      className="p-2 bg-gray-50 dark:bg-gray-700 rounded"
                    >
                      <p className="text-gray-700 dark:text-gray-300">
                        {index + 1}. {step}
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
        {step < 5 ? (
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
            Create Resolution Plan
          </button>
        )}
      </div>
    </div>
  )
} 