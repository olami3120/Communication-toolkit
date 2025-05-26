import { useState } from 'react'

type IntegrationType = 'slack' | 'email' | 'calendar' | 'jira' | 'github'
type AutomationType = 'task' | 'message' | 'decision' | 'conflict' | 'feedback'

interface Integration {
  id: string
  type: IntegrationType
  name: string
  status: 'connected' | 'disconnected'
  lastSync: Date
}

interface Automation {
  id: string
  type: AutomationType
  name: string
  trigger: string
  action: string
  isEnabled: boolean
}

export const IntegrationHub = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: '1',
      type: 'slack',
      name: 'Slack Workspace',
      status: 'disconnected',
      lastSync: new Date(),
    },
    {
      id: '2',
      type: 'email',
      name: 'Gmail',
      status: 'disconnected',
      lastSync: new Date(),
    },
    {
      id: '3',
      type: 'calendar',
      name: 'Google Calendar',
      status: 'disconnected',
      lastSync: new Date(),
    },
    {
      id: '4',
      type: 'jira',
      name: 'Jira Project',
      status: 'disconnected',
      lastSync: new Date(),
    },
    {
      id: '5',
      type: 'github',
      name: 'GitHub Repository',
      status: 'disconnected',
      lastSync: new Date(),
    },
  ])

  const [automations, setAutomations] = useState<Automation[]>([
    {
      id: '1',
      type: 'task',
      name: 'Auto-create task from email',
      trigger: 'New email received',
      action: 'Create task',
      isEnabled: false,
    },
    {
      id: '2',
      type: 'message',
      name: 'Slack notification for decisions',
      trigger: 'New decision created',
      action: 'Send Slack message',
      isEnabled: false,
    },
    {
      id: '3',
      type: 'conflict',
      name: 'Auto-assign conflict resolution',
      trigger: 'New conflict detected',
      action: 'Assign to team lead',
      isEnabled: false,
    },
  ])

  const handleConnectIntegration = (integration: Integration) => {
    setIntegrations(prev =>
      prev.map(i =>
        i.id === integration.id
          ? { ...i, status: 'connected', lastSync: new Date() }
          : i
      )
    )
  }

  const handleDisconnectIntegration = (integration: Integration) => {
    setIntegrations(prev =>
      prev.map(i =>
        i.id === integration.id
          ? { ...i, status: 'disconnected' }
          : i
      )
    )
  }

  const handleToggleAutomation = (automation: Automation) => {
    setAutomations(prev =>
      prev.map(a =>
        a.id === automation.id
          ? { ...a, isEnabled: !a.isEnabled }
          : a
      )
    )
  }

  const getIntegrationIcon = (type: IntegrationType) => {
    switch (type) {
      case 'slack':
        return '💬'
      case 'email':
        return '📧'
      case 'calendar':
        return '📅'
      case 'jira':
        return '📋'
      case 'github':
        return '💻'
    }
  }

  const getAutomationIcon = (type: AutomationType) => {
    switch (type) {
      case 'task':
        return '✅'
      case 'message':
        return '💬'
      case 'decision':
        return '🤔'
      case 'conflict':
        return '⚡'
      case 'feedback':
        return '📝'
    }
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Integration Hub
      </h2>

      {/* Integrations Section */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          External Integrations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {integrations.map(integration => (
            <div
              key={integration.id}
              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <span className="text-2xl mr-2">{getIntegrationIcon(integration.type)}</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {integration.name}
                  </span>
                </div>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    integration.status === 'connected'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}
                >
                  {integration.status}
                </span>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Last sync: {integration.lastSync.toLocaleString()}
              </div>
              <button
                onClick={() =>
                  integration.status === 'connected'
                    ? handleDisconnectIntegration(integration)
                    : handleConnectIntegration(integration)
                }
                className={`w-full px-3 py-1 rounded text-sm font-medium ${
                  integration.status === 'connected'
                    ? 'bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800'
                    : 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800'
                }`}
              >
                {integration.status === 'connected' ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Automations Section */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Automated Workflows
        </h3>
        <div className="space-y-4">
          {automations.map(automation => (
            <div
              key={automation.id}
              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <span className="text-2xl mr-2">{getAutomationIcon(automation.type)}</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {automation.name}
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={automation.isEnabled}
                    onChange={() => handleToggleAutomation(automation)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <div>Trigger: {automation.trigger}</div>
                <div>Action: {automation.action}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 