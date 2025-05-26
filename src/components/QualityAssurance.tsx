import { useState } from 'react'

interface QualityCheck {
  id: string
  name: string
  description: string
  severity: 'low' | 'medium' | 'high'
  status: 'open' | 'in-progress' | 'resolved'
  assignedTo: string
  dueDate: string
}

interface ValidationRule {
  id: string
  name: string
  description: string
  isEnabled: boolean
  lastTriggered: string
  impact: 'low' | 'medium' | 'high'
}

export const QualityAssurance = () => {
  const [qualityChecks] = useState<QualityCheck[]>([
    {
      id: '1',
      name: 'Message Clarity Validation',
      description: 'Ensure all messages meet minimum clarity requirements',
      severity: 'high',
      status: 'open',
      assignedTo: 'John Doe',
      dueDate: '2024-03-25'
    },
    {
      id: '2',
      name: 'Task Priority Consistency',
      description: 'Verify task priority assignments are consistent',
      severity: 'medium',
      status: 'in-progress',
      assignedTo: 'Jane Smith',
      dueDate: '2024-03-26'
    },
    {
      id: '3',
      name: 'Conflict Resolution Workflow',
      description: 'Validate conflict resolution process flow',
      severity: 'high',
      status: 'resolved',
      assignedTo: 'Mike Johnson',
      dueDate: '2024-03-24'
    }
  ])

  const [validationRules, setValidationRules] = useState<ValidationRule[]>([
    {
      id: '1',
      name: 'Message Length Check',
      description: 'Ensure messages are within acceptable length limits',
      isEnabled: true,
      lastTriggered: '2024-03-20 09:15',
      impact: 'medium'
    },
    {
      id: '2',
      name: 'Task Deadline Validation',
      description: 'Verify task deadlines are set and valid',
      isEnabled: true,
      lastTriggered: '2024-03-20 09:20',
      impact: 'high'
    },
    {
      id: '3',
      name: 'User Input Sanitization',
      description: 'Check for proper input sanitization',
      isEnabled: false,
      lastTriggered: '2024-03-19 16:45',
      impact: 'high'
    }
  ])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-500'
      case 'medium':
        return 'text-yellow-500'
      case 'low':
        return 'text-green-500'
      default:
        return 'text-gray-500'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-red-100 text-red-800'
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800'
      case 'resolved':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const toggleValidationRule = (id: string) => {
    setValidationRules(prev =>
      prev.map(rule =>
        rule.id === id ? { ...rule, isEnabled: !rule.isEnabled } : rule
      )
    )
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Quality Assurance
      </h2>

      {/* Quality Checks */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Quality Checks
        </h3>
        <div className="space-y-4">
          {qualityChecks.map((check) => (
            <div
              key={check.id}
              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {check.name}
                    </h4>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                        check.status
                      )}`}
                    >
                      {check.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {check.description}
                  </p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className={`text-sm ${getSeverityColor(check.severity)}`}>
                      Severity: {check.severity.toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Assigned to: {check.assignedTo}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Due: {check.dueDate}
                    </span>
                  </div>
                </div>
                <button
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Update Status
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Validation Rules */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Validation Rules
        </h3>
        <div className="space-y-4">
          {validationRules.map((rule) => (
            <div
              key={rule.id}
              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {rule.name}
                    </h4>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getSeverityColor(
                        rule.impact
                      )}`}
                    >
                      Impact: {rule.impact.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {rule.description}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Last triggered: {rule.lastTriggered}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rule.isEnabled}
                    onChange={() => toggleValidationRule(rule.id)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 