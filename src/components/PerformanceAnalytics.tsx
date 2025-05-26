import { useStore } from '../store'
import { Message, Decision, Conflict, Feedback } from '../types'

export const PerformanceAnalytics = () => {
  const { tasks, messages, decisions, conflicts, feedbacks } = useStore()

  const calculateResponseTime = (items: Array<Message | Decision | Conflict | Feedback>) => {
    const itemsWithResponse = items.filter(item => item.updatedAt && item.createdAt)
    if (itemsWithResponse.length === 0) return 0

    const totalResponseTime = itemsWithResponse.reduce((sum, item) => {
      const responseTime = item.updatedAt.getTime() - item.createdAt.getTime()
      return sum + responseTime
    }, 0)

    return totalResponseTime / itemsWithResponse.length / (1000 * 60 * 60) // Convert to hours
  }

  const calculateResolutionRate = (items: Array<Decision | Conflict | Feedback>) => {
    const resolved = items.filter(item => item.status === 'completed').length
    return items.length > 0 ? (resolved / items.length) * 100 : 0
  }

  const calculateTaskEfficiency = () => {
    const completedTasks = tasks.filter(task => task.status === 'completed')
    if (completedTasks.length === 0) return 0

    const totalImpact = completedTasks.reduce((sum, task) => sum + task.impact, 0)
    const totalEffort = completedTasks.reduce((sum, task) => sum + task.effort, 0)
    return totalImpact / totalEffort
  }

  const getCommunicationEffectiveness = () => {
    const totalItems = messages.length + decisions.length + conflicts.length + feedbacks.length
    if (totalItems === 0) return 0

    const resolvedItems = decisions.filter(d => d.status === 'completed').length +
      conflicts.filter(c => c.status === 'completed').length +
      feedbacks.filter(f => f.status === 'completed').length

    return (resolvedItems / totalItems) * 100
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Performance Analytics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Response Time Metrics */}
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Response Time
          </h3>
          <div className="space-y-2">
            <p className="text-gray-600 dark:text-gray-300">
              Average Response Time: {calculateResponseTime([...messages, ...decisions, ...conflicts, ...feedbacks]).toFixed(1)} hours
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Message Response: {calculateResponseTime(messages).toFixed(1)} hours
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Decision Response: {calculateResponseTime(decisions).toFixed(1)} hours
            </p>
          </div>
        </div>

        {/* Resolution Rate Metrics */}
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Resolution Rates
          </h3>
          <div className="space-y-2">
            <p className="text-gray-600 dark:text-gray-300">
              Decision Resolution: {calculateResolutionRate(decisions).toFixed(1)}%
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Conflict Resolution: {calculateResolutionRate(conflicts).toFixed(1)}%
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Feedback Resolution: {calculateResolutionRate(feedbacks).toFixed(1)}%
            </p>
          </div>
        </div>

        {/* Task Efficiency Metrics */}
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Task Efficiency
          </h3>
          <div className="space-y-2">
            <p className="text-gray-600 dark:text-gray-300">
              Impact/Effort Ratio: {calculateTaskEfficiency().toFixed(2)}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Completed Tasks: {tasks.filter(t => t.status === 'completed').length}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Average Impact: {(tasks.reduce((sum, t) => sum + t.impact, 0) / tasks.length || 0).toFixed(1)}/5
            </p>
          </div>
        </div>

        {/* Communication Effectiveness */}
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Communication Effectiveness
          </h3>
          <div className="space-y-2">
            <p className="text-gray-600 dark:text-gray-300">
              Overall Effectiveness: {getCommunicationEffectiveness().toFixed(1)}%
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Total Communications: {messages.length + decisions.length + conflicts.length + feedbacks.length}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Active Items: {decisions.filter(d => d.status !== 'completed').length +
                conflicts.filter(c => c.status !== 'completed').length +
                feedbacks.filter(f => f.status !== 'completed').length}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 