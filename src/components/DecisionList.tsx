import { useStore } from '../store'
import { Decision } from '../types'

export const DecisionList = () => {
  const { decisions, deleteDecision } = useStore()

  const calculateScore = (decision: Decision) => {
    if (!decision.criteria || !decision.options) return 0

    const totalScore = decision.criteria.reduce((sum, criteria) => {
      const score = decision.options!.reduce((optionSum, option) => {
        return optionSum + (option.scores[criteria.id] || 0)
      }, 0)
      return sum + (score * (criteria.weight || 0))
    }, 0)

    const totalWeight = decision.criteria.reduce((sum, criteria) => sum + (criteria.weight || 0), 0)

    return totalWeight > 0 ? totalScore / totalWeight : 0
  }

  return (
    <div className="space-y-6">
      {decisions.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-4">
          No decisions yet. Create your first decision using the form above.
        </p>
      ) : (
        decisions.map((decision) => {
          const score = calculateScore(decision)

          return (
            <div
              key={decision.id}
              className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {decision.title}
                  </h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">
                    {decision.description}
                  </p>
                </div>
                <button
                  onClick={() => deleteDecision(decision.id)}
                  className="text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                >
                  Delete
                </button>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Criteria
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {decision.criteria.map((criteria) => (
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

              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Options & Scores
                </h4>
                <div className="space-y-2">
                  {decision.options!.map((option) => (
                    <div
                      key={option.id}
                      className={`p-2 rounded ${
                        option.id === decision.options![0].id
                          ? 'bg-green-50 dark:bg-green-900'
                          : 'bg-gray-50 dark:bg-gray-700'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 dark:text-gray-300">
                          {option.title}
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          Score: {score.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                Created: {decision.createdAt.toLocaleString()}
              </div>
            </div>
          )
        })
      )}
    </div>
  )
} 