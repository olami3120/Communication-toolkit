import { useStore } from '../store'
import { Message } from '../types'

export const MessageList = () => {
  const { messages, deleteMessage } = useStore()

  const getPriorityColor = (message: Message) => {
    const score = (message.impact + message.urgency) / 2
    if (score >= 8) return 'bg-red-100 dark:bg-red-900'
    if (score >= 6) return 'bg-yellow-100 dark:bg-yellow-900'
    return 'bg-green-100 dark:bg-green-900'
  }

  return (
    <div className="space-y-4">
      {messages.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-4">
          No messages yet. Create your first message using the form above.
        </p>
      ) : (
        messages.map((message) => (
          <div
            key={message.id}
            className={`p-4 rounded-lg shadow ${getPriorityColor(message)}`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {message.title}
                </h3>
                <p className="mt-1 text-gray-600 dark:text-gray-300">
                  {message.content}
                </p>
              </div>
              <button
                onClick={() => deleteMessage(message.id)}
                className="text-gray-400 hover:text-red-500 dark:hover:text-red-400"
              >
                Delete
              </button>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-500 dark:text-gray-400">Clarity:</span>{' '}
                {message.clarity}/10
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Impact:</span>{' '}
                {message.impact}/10
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Urgency:</span>{' '}
                {message.urgency}/10
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Created: {message.createdAt.toLocaleString()}
            </div>
          </div>
        ))
      )}
    </div>
  )
} 