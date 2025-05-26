import { useState, useEffect } from 'react'
import { trackEvent } from '../config/analytics'

interface ErrorLog {
  id: string
  message: string
  timestamp: string
  level: 'error' | 'warning' | 'info'
  context: Record<string, any>
}

interface AnalyticsData {
  pageViews: number
  activeUsers: number
  errorRate: number
  averageResponseTime: number
}

export const MonitoringDashboard = () => {
  const [errorLogs, setErrorLogs] = useState<ErrorLog[]>([])
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    pageViews: 0,
    activeUsers: 0,
    errorRate: 0,
    averageResponseTime: 0
  })

  useEffect(() => {
    // Fetch error logs from Sentry
    const fetchErrorLogs = async () => {
      try {
        const response = await fetch('/api/error-logs')
        const data = await response.json()
        setErrorLogs(data)
      } catch (error) {
        console.error('Error fetching logs:', error)
      }
    }

    // Fetch analytics data
    const fetchAnalyticsData = async () => {
      try {
        const response = await fetch('/api/analytics')
        const data = await response.json()
        setAnalyticsData(data)
      } catch (error) {
        console.error('Error fetching analytics:', error)
      }
    }

    fetchErrorLogs()
    fetchAnalyticsData()

    // Set up periodic refresh
    const interval = setInterval(() => {
      fetchErrorLogs()
      fetchAnalyticsData()
    }, 60000) // Refresh every minute

    return () => clearInterval(interval)
  }, [])

  const handleErrorAction = (errorId: string, action: 'resolve' | 'ignore') => {
    trackEvent('Error Management', action, errorId)
    // Implement error resolution logic
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Monitoring Dashboard
      </h2>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <h3 className="text-lg font-medium text-blue-900 dark:text-blue-100">
            Page Views
          </h3>
          <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
            {analyticsData.pageViews}
          </p>
        </div>
        <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg">
          <h3 className="text-lg font-medium text-green-900 dark:text-green-100">
            Active Users
          </h3>
          <p className="text-2xl font-bold text-green-700 dark:text-green-300">
            {analyticsData.activeUsers}
          </p>
        </div>
        <div className="p-4 bg-red-50 dark:bg-red-900 rounded-lg">
          <h3 className="text-lg font-medium text-red-900 dark:text-red-100">
            Error Rate
          </h3>
          <p className="text-2xl font-bold text-red-700 dark:text-red-300">
            {analyticsData.errorRate}%
          </p>
        </div>
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg">
          <h3 className="text-lg font-medium text-yellow-900 dark:text-yellow-100">
            Avg Response Time
          </h3>
          <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">
            {analyticsData.averageResponseTime}ms
          </p>
        </div>
      </div>

      {/* Error Logs */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Recent Errors
        </h3>
        <div className="space-y-4">
          {errorLogs.map((error) => (
            <div
              key={error.id}
              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {error.message}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(error.timestamp).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Level: {error.level}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleErrorAction(error.id, 'resolve')}
                    className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  >
                    Resolve
                  </button>
                  <button
                    onClick={() => handleErrorAction(error.id, 'ignore')}
                    className="px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                  >
                    Ignore
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 