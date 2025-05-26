import { useStore } from '../store'

interface TimelineItem {
  id: string
  type: 'message' | 'decision' | 'conflict' | 'feedback'
  title: string
  description: string
  timestamp: Date
  status: string
  impact?: number
  effort?: number
}

export const TimelineVisualization = () => {
  const { messages, decisions, conflicts, feedbacks } = useStore()

  const getTimelineItems = (): TimelineItem[] => {
    const items: TimelineItem[] = [
      ...messages.map(message => ({
        id: message.id,
        type: 'message' as const,
        title: message.title,
        description: message.content,
        timestamp: message.createdAt,
        status: 'sent',
        impact: message.impact
      })),
      ...decisions.map(decision => ({
        id: decision.id,
        type: 'decision' as const,
        title: decision.title,
        description: decision.description,
        timestamp: decision.createdAt,
        status: decision.status
      })),
      ...conflicts.map(conflict => ({
        id: conflict.id,
        type: 'conflict' as const,
        title: conflict.title,
        description: conflict.description,
        timestamp: conflict.createdAt,
        status: conflict.status
      })),
      ...feedbacks.map(feedback => ({
        id: feedback.id,
        type: 'feedback' as const,
        title: feedback.title,
        description: feedback.description,
        timestamp: feedback.createdAt,
        status: feedback.status
      }))
    ]

    return items.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Timeline
      </h2>

      <div className="space-y-4">
        {getTimelineItems().map(item => (
          <div
            key={item.id}
            className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item.timestamp.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {item.description}
                </p>
                <span className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${
                  item.status === 'completed' ? 'bg-green-100 text-green-800' :
                  item.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {item.status.toUpperCase()}
                </span>
                {item.impact !== undefined && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Impact: {item.impact}
                  </p>
                )}
                {item.effort !== undefined && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Effort: {item.effort}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 