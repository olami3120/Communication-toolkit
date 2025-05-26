import { useStore } from '../store'
import { Feedback } from '../types'

export const FeedbackList = () => {
  const { feedbacks, deleteFeedback, updateFeedbackStatus } = useStore()

  const getStatusColor = (status: Feedback['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
      case 'in_progress':
        return 'bg-blue-50 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
      case 'completed':
        return 'bg-green-50 dark:bg-green-900 text-green-800 dark:text-green-200'
      default:
        return 'bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
    }
  }

  const getTypeColor = (type: Feedback['type']) => {
    switch (type) {
      case 'improvement':
        return 'bg-purple-50 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
      case 'praise':
        return 'bg-green-50 dark:bg-green-900 text-green-800 dark:text-green-200'
      case 'concern':
        return 'bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-200'
      case 'suggestion':
        return 'bg-blue-50 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
      default:
        return 'bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
    }
  }

  const getPriorityColor = (priority: Feedback['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-200'
      case 'medium':
        return 'bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
      case 'low':
        return 'bg-green-50 dark:bg-green-900 text-green-800 dark:text-green-200'
      default:
        return 'bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
    }
  }

  return (
    <div className="space-y-6">
      {feedbacks.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-4">
          No feedback yet. Submit your first feedback using the form above.
        </p>
      ) : (
        feedbacks.map((feedback) => (
          <div
            key={feedback.id}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {feedback.title}
                </h3>
                <p className="mt-1 text-gray-600 dark:text-gray-300">
                  {feedback.description}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <select
                  value={feedback.status}
                  onChange={(e) => updateFeedbackStatus(feedback.id, e.target.value as Feedback['status'])}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(feedback.status)}`}
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <button
                  onClick={() => deleteFeedback(feedback.id)}
                  className="text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(feedback.type)}`}>
                  {feedback.type}
                </span>
              </div>
              <div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(feedback.priority)}`}>
                  {feedback.priority} Priority
                </span>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Action Items
              </h4>
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

            <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
              Created: {feedback.createdAt.toLocaleString()}
            </div>
          </div>
        ))
      )}
    </div>
  )
} 