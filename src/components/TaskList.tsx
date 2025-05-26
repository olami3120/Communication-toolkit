import { useStore } from '../store'
import { Task } from '../types'

export const TaskList = () => {
  const { tasks, deleteTask, updateTaskStatus } = useStore()

  const getPriorityColor = (impact: number, effort: number) => {
    const ratio = impact / effort
    if (ratio >= 1.5) return 'bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-200'
    if (ratio >= 0.75) return 'bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
    return 'bg-green-50 dark:bg-green-900 text-green-800 dark:text-green-200'
  }

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
      case 'in_progress':
        return 'bg-blue-50 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
      case 'completed':
        return 'bg-green-50 dark:bg-green-900 text-green-800 dark:text-green-200'
      default:
        return 'bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
    }
  }

  return (
    <div className="space-y-6">
      {tasks.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-4">
          No tasks yet. Add your first task using the form above.
        </p>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {task.title}
                </h3>
                <p className="mt-1 text-gray-600 dark:text-gray-300">
                  {task.description}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <select
                  value={task.status}
                  onChange={(e) => updateTaskStatus(task.id, e.target.value as Task['status'])}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(task.status)}`}
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.impact, task.effort)}`}>
                  Impact: {task.impact}/5
                </span>
              </div>
              <div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.impact, task.effort)}`}>
                  Effort: {task.effort}/5
                </span>
              </div>
            </div>

            <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
              Created: {task.createdAt.toLocaleString()}
            </div>
          </div>
        ))
      )}
    </div>
  )
} 