import { useState } from 'react'

interface TestCase {
  id: string
  name: string
  description: string
  status: 'passed' | 'failed' | 'pending'
  type: 'unit' | 'integration' | 'e2e'
  lastRun: string
}

interface QualityMetric {
  name: string
  value: number
  threshold: number
  status: 'pass' | 'fail'
}

export const TestSuite = () => {
  const [testCases] = useState<TestCase[]>([
    {
      id: '1',
      name: 'Message Clarity Score Calculation',
      description: 'Verify correct calculation of message clarity scores',
      status: 'passed',
      type: 'unit',
      lastRun: '2024-03-20 10:30'
    },
    {
      id: '2',
      name: 'Task Priority Assignment',
      description: 'Test automatic task priority assignment logic',
      status: 'failed',
      type: 'integration',
      lastRun: '2024-03-20 10:35'
    },
    {
      id: '3',
      name: 'Conflict Resolution Flow',
      description: 'End-to-end test of conflict resolution process',
      status: 'pending',
      type: 'e2e',
      lastRun: '2024-03-20 10:40'
    }
  ])

  const [qualityMetrics] = useState<QualityMetric[]>([
    {
      name: 'Code Coverage',
      value: 85,
      threshold: 80,
      status: 'pass'
    },
    {
      name: 'Test Pass Rate',
      value: 92,
      threshold: 90,
      status: 'pass'
    },
    {
      name: 'Performance Score',
      value: 75,
      threshold: 80,
      status: 'fail'
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed':
      case 'pass':
        return 'text-green-500'
      case 'failed':
      case 'fail':
        return 'text-red-500'
      case 'pending':
        return 'text-yellow-500'
      default:
        return 'text-gray-500'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'unit':
        return 'bg-blue-100 text-blue-800'
      case 'integration':
        return 'bg-purple-100 text-purple-800'
      case 'e2e':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Test Suite & Quality Metrics
      </h2>

      {/* Quality Metrics */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Quality Metrics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {qualityMetrics.map((metric) => (
            <div
              key={metric.name}
              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                {metric.name}
              </h4>
              <div className="flex items-baseline justify-between">
                <p className={`text-2xl font-bold ${getStatusColor(metric.status)}`}>
                  {metric.value}%
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Threshold: {metric.threshold}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Test Cases */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Test Cases
        </h3>
        <div className="space-y-4">
          {testCases.map((testCase) => (
            <div
              key={testCase.id}
              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {testCase.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {testCase.description}
                  </p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className={`text-sm ${getStatusColor(testCase.status)}`}>
                      {testCase.status.charAt(0).toUpperCase() + testCase.status.slice(1)}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getTypeColor(
                        testCase.type
                      )}`}
                    >
                      {testCase.type.toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Last run: {testCase.lastRun}
                    </span>
                  </div>
                </div>
                <button
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Run Test
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 