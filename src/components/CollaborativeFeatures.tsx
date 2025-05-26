import { getDatabase, ref, onValue } from 'firebase/database'
import { useState, useEffect } from 'react'
import { Template, Decision } from '../types'

export const CollaborativeFeatures = () => {
  const [templates, setTemplates] = useState<Template[]>([])
  const [decisions, setDecisions] = useState<Decision[]>([])

  useEffect(() => {
    const database = getDatabase()
    const templatesRef = ref(database, 'templates')
    const decisionsRef = ref(database, 'decisions')

    onValue(templatesRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const templatesList = Object.values(data) as Template[]
        setTemplates(templatesList)
      }
    })

    onValue(decisionsRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const decisionsList = Object.values(data) as Decision[]
        setDecisions(decisionsList)
      }
    })
  }, [])

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Collaborative Features
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Templates
          </h3>
          <div className="space-y-4">
            {templates.map((template) => (
              <div
                key={template.id}
                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {template.title}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Version {template.version} • Last modified: {template.lastModified}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Shared with: {template.sharedWith.join(', ')}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Decisions
          </h3>
          <div className="space-y-4">
            {decisions.map((decision) => (
              <div
                key={decision.id}
                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {decision.title}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Version {decision.version} • Last modified: {decision.lastModified}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Collaborators: {decision.collaborators.join(', ')}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Status: {decision.status}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 