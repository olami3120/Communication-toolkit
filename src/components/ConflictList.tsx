import { useStore } from '../store'
import { Conflict } from '../types'

export const ConflictList = () => {
  const { conflicts, deleteConflict, updateConflictStatus } = useStore()

  const getStatusColor = (status: Conflict['status']) => {
    switch (status) {
      case 'active':
        return 'bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
      case 'resolved':
        return 'bg-green-50 dark:bg-green-900 text-green-800 dark:text-green-200'
      default:
        return 'bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
    }
  }

  return (
    <div className="space-y-6">
      {conflicts.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-4">
          No conflicts yet. Create your first conflict resolution plan using the form above.
        </p>
      ) : (
        conflicts.map((conflict) => (
          <div
            key={conflict.id}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {conflict.title}
                </h3>
                <p className="mt-1 text-gray-600 dark:text-gray-300">
                  {conflict.description}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <select
                  value={conflict.status}
                  onChange={(e) => updateConflictStatus(conflict.id, e.target.value as Conflict['status'])}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(conflict.status)}`}
                >
                  <option value="active">Active</option>
                  <option value="resolved">Resolved</option>
                </select>
                <button
                  onClick={() => deleteConflict(conflict.id)}
                  className="text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Involved Parties
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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

            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Root Causes
              </h4>
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

            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Resolution Steps
              </h4>
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

            <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
              Created: {conflict.createdAt.toLocaleString()}
            </div>
          </div>
        ))
      )}
    </div>
  )
} 