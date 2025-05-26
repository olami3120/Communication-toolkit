import { useState } from 'react'
import { useStore } from '../store'
import { Task, Message, Decision, Conflict, Feedback } from '../types'

type TimeRange = 'day' | 'week' | 'month' | 'year'
type MetricType = 'tasks' | 'messages' | 'decisions' | 'conflicts' | 'feedback'

export const AnalyticsDashboard = () => {
  const { tasks, messages, decisions, conflicts, feedbacks } = useStore()
  const [timeRange, setTimeRange] = useState<TimeRange>('week')
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('tasks')

  const getDateRange = () => {
    const now = new Date()
    const start = new Date()
    
    switch (timeRange) {
      case 'day':
        start.setDate(now.getDate() - 1)
        break
      case 'week':
        start.setDate(now.getDate() - 7)
        break
      case 'month':
        start.setMonth(now.getMonth() - 1)
        break
      case 'year':
        start.setFullYear(now.getFullYear() - 1)
        break
    }
    
    return { start, end: now }
  }

  const filterItemsByDateRange = <T extends { createdAt: Date }>(items: T[]) => {
    const { start, end } = getDateRange()
    return items.filter(item => item.createdAt >= start && item.createdAt <= end)
  }

  const calculateCompletionRate = (items: Array<Task | Decision | Conflict | Feedback>) => {
    const filteredItems = filterItemsByDateRange(items)
    if (filteredItems.length === 0) return 0
    const completed = filteredItems.filter(item => item.status === 'completed').length
    return (completed / filteredItems.length) * 100
  }

  const calculateAverageResponseTime = (items: Array<Message | Decision | Conflict | Feedback>) => {
    const filteredItems = filterItemsByDateRange(items)
    if (filteredItems.length === 0) return 0
    
    const totalTime = filteredItems.reduce((sum, item) => {
      const responseTime = item.updatedAt.getTime() - item.createdAt.getTime()
      return sum + responseTime
    }, 0)
    
    return totalTime / filteredItems.length / (1000 * 60 * 60) // Convert to hours
  }

  const calculateImpactScore = (items: Array<Task | Message>) => {
    const filteredItems = filterItemsByDateRange(items)
    if (filteredItems.length === 0) return 0
    
    const totalImpact = filteredItems.reduce((sum, item) => sum + item.impact, 0)
    return totalImpact / filteredItems.length
  }

  const getMetricData = () => {
    switch (selectedMetric) {
      case 'tasks':
        return {
          completionRate: calculateCompletionRate(tasks),
          averageImpact: calculateImpactScore(tasks),
          totalItems: filterItemsByDateRange(tasks).length,
          statusDistribution: {
            pending: filterItemsByDateRange(tasks).filter(t => t.status === 'pending').length,
            inProgress: filterItemsByDateRange(tasks).filter(t => t.status === 'in_progress').length,
            completed: filterItemsByDateRange(tasks).filter(t => t.status === 'completed').length,
          }
        }
      case 'messages':
        return {
          responseTime: calculateAverageResponseTime(messages),
          averageImpact: calculateImpactScore(messages),
          totalItems: filterItemsByDateRange(messages).length,
          statusDistribution: {
            sent: filterItemsByDateRange(messages).filter(m => m.status === 'sent').length,
            read: filterItemsByDateRange(messages).filter(m => m.status === 'read').length,
            responded: filterItemsByDateRange(messages).filter(m => m.status === 'responded').length,
          }
        }
      case 'decisions':
        return {
          completionRate: calculateCompletionRate(decisions),
          responseTime: calculateAverageResponseTime(decisions),
          totalItems: filterItemsByDateRange(decisions).length,
          statusDistribution: {
            pending: filterItemsByDateRange(decisions).filter(d => d.status === 'pending').length,
            inProgress: filterItemsByDateRange(decisions).filter(d => d.status === 'in_progress').length,
            completed: filterItemsByDateRange(decisions).filter(d => d.status === 'completed').length,
          }
        }
      case 'conflicts':
        return {
          completionRate: calculateCompletionRate(conflicts),
          responseTime: calculateAverageResponseTime(conflicts),
          totalItems: filterItemsByDateRange(conflicts).length,
          statusDistribution: {
            pending: filterItemsByDateRange(conflicts).filter(c => c.status === 'pending').length,
            inProgress: filterItemsByDateRange(conflicts).filter(c => c.status === 'in_progress').length,
            completed: filterItemsByDateRange(conflicts).filter(c => c.status === 'completed').length,
          }
        }
      case 'feedback':
        return {
          completionRate: calculateCompletionRate(feedbacks),
          responseTime: calculateAverageResponseTime(feedbacks),
          totalItems: filterItemsByDateRange(feedbacks).length,
          statusDistribution: {
            pending: filterItemsByDateRange(feedbacks).filter(f => f.status === 'pending').length,
            inProgress: filterItemsByDateRange(feedbacks).filter(f => f.status === 'in_progress').length,
            completed: filterItemsByDateRange(feedbacks).filter(f => f.status === 'completed').length,
          }
        }
    }
  }

  const metricData = getMetricData()

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Analytics Dashboard
      </h2>

      {/* Controls */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-48">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as TimeRange)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="day">Last 24 Hours</option>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="year">Last 12 Months</option>
          </select>
        </div>
        <div className="w-full md:w-48">
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value as MetricType)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="tasks">Tasks</option>
            <option value="messages">Messages</option>
            <option value="decisions">Decisions</option>
            <option value="conflicts">Conflicts</option>
            <option value="feedback">Feedback</option>
          </select>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Completion Rate */}
        {'completionRate' in metricData && (
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Completion Rate
            </h3>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {metricData.completionRate?.toFixed(1) ?? '0'}%
            </p>
          </div>
        )}

        {/* Response Time */}
        {'responseTime' in metricData && (
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Average Response Time
            </h3>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {metricData.responseTime?.toFixed(1) ?? '0'}h
            </p>
          </div>
        )}

        {/* Impact Score */}
        {'averageImpact' in metricData && (
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Average Impact
            </h3>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {metricData.averageImpact?.toFixed(1) ?? '0'}/5
            </p>
          </div>
        )}

        {/* Total Items */}
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Total Items
          </h3>
          <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
            {metricData.totalItems}
          </p>
        </div>
      </div>

      {/* Status Distribution */}
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Status Distribution
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(metricData.statusDistribution).map(([status, count]) => (
            <div key={status} className="p-3 bg-white dark:bg-gray-800 rounded-lg">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 capitalize">
                {status.replace('_', ' ')}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {count}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 