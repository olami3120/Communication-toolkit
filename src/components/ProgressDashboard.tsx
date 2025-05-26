import { useStore } from '../store'
import { Task, Message, Decision, Conflict, Feedback } from '../types'

export const ProgressDashboard = () => {
  const { tasks, messages, decisions, conflicts, feedbacks } = useStore()

  const calculateCompletionRate = (items: Array<Task | Message | Decision | Conflict | Feedback>) => {
    const completed = items.filter(item => item.status === 'completed').length
    return items.length > 0 ? (completed / items.length) * 100 : 0
  }

  const calculateAverageImpact = (items: Array<Task | Message | Decision | Conflict | Feedback>) => {
    const itemsWithImpact = items.filter(item => 'impact' in item) as Array<Task | Message>
    return itemsWithImpact.length > 0
      ? itemsWithImpact.reduce((sum, item) => sum + item.impact, 0) / itemsWithImpact.length
      : 0
  }

  const getStatusDistribution = (items: Array<Task | Message | Decision | Conflict | Feedback>) => {
    const distribution: Record<string, number> = {
      pending: 0,
      in_progress: 0,
      completed: 0,
      sent: 0,
      read: 0,
      responded: 0
    }
    items.forEach(item => {
      if (item.status && item.status in distribution) {
        distribution[item.status]++
      }
    })
    return distribution
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Progress Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Tasks Metrics */}
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Tasks
          </h3>
          <div className="space-y-2">
            <p className="text-gray-600 dark:text-gray-300">
              Completion Rate: {calculateCompletionRate(tasks).toFixed(1)}%
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Average Impact: {calculateAverageImpact(tasks).toFixed(1)}/5
            </p>
            <div className="space-y-1">
              {Object.entries(getStatusDistribution(tasks)).map(([status, count]) => (
                <div key={status} className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300 capitalize">
                    {status.replace('_', ' ')}:
                  </span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Messages Metrics */}
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Messages
          </h3>
          <div className="space-y-2">
            <p className="text-gray-600 dark:text-gray-300">
              Total Messages: {messages.length}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Average Impact: {calculateAverageImpact(messages).toFixed(1)}/5
            </p>
          </div>
        </div>

        {/* Decisions Metrics */}
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Decisions
          </h3>
          <div className="space-y-2">
            <p className="text-gray-600 dark:text-gray-300">
              Total Decisions: {decisions.length}
            </p>
            <div className="space-y-1">
              {Object.entries(getStatusDistribution(decisions)).map(([status, count]) => (
                <div key={status} className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300 capitalize">
                    {status.replace('_', ' ')}:
                  </span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Conflicts & Feedback Metrics */}
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Conflicts & Feedback
          </h3>
          <div className="space-y-2">
            <p className="text-gray-600 dark:text-gray-300">
              Active Conflicts: {conflicts.filter(c => c.status !== 'completed').length}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Pending Feedback: {feedbacks.filter(f => f.status === 'pending').length}
            </p>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">
                  Resolved Conflicts:
                </span>
                <span className="text-gray-900 dark:text-white font-medium">
                  {conflicts.filter(c => c.status === 'completed').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">
                  Completed Feedback:
                </span>
                <span className="text-gray-900 dark:text-white font-medium">
                  {feedbacks.filter(f => f.status === 'completed').length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 