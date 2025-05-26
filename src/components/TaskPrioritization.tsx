import { useState } from 'react'
import { useStore } from '../store'
import { Task } from '../types'

export const TaskPrioritization = () => {
  const { addTask } = useStore()
  const [task, setTask] = useState<Partial<Task>>({
    title: '',
    description: '',
    impact: 0,
    effort: 0,
    status: 'pending',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!task.title?.trim()) {
      newErrors.title = 'Title is required'
    }
    if (!task.description?.trim()) {
      newErrors.description = 'Description is required'
    }
    if (task.impact === undefined || task.impact < 1 || task.impact > 5) {
      newErrors.impact = 'Impact must be between 1 and 5'
    }
    if (task.effort === undefined || task.effort < 1 || task.effort > 5) {
      newErrors.effort = 'Effort must be between 1 and 5'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      const newTask: Task = {
        id: crypto.randomUUID(),
        title: task.title!,
        description: task.description!,
        impact: task.impact!,
        effort: task.effort!,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      addTask(newTask)
      // Reset form
      setTask({
        title: '',
        description: '',
        impact: 0,
        effort: 0,
        status: 'pending',
      })
    }
  }

  const getPriority = (impact: number, effort: number) => {
    const ratio = impact / effort
    if (ratio >= 1.5) return 'high'
    if (ratio >= 0.75) return 'medium'
    return 'low'
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Task Prioritization Matrix
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Task Title
          </label>
          <input
            type="text"
            value={task.title}
            onChange={(e) => setTask(prev => ({ ...prev, title: e.target.value }))}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              errors.title ? 'border-red-500' : ''
            }`}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            value={task.description}
            onChange={(e) => setTask(prev => ({ ...prev, description: e.target.value }))}
            rows={3}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              errors.description ? 'border-red-500' : ''
            }`}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Impact (1-5)
            </label>
            <input
              type="number"
              min="1"
              max="5"
              value={task.impact || ''}
              onChange={(e) => setTask(prev => ({ ...prev, impact: parseInt(e.target.value) }))}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.impact ? 'border-red-500' : ''
              }`}
            />
            {errors.impact && (
              <p className="mt-1 text-sm text-red-600">{errors.impact}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Effort (1-5)
            </label>
            <input
              type="number"
              min="1"
              max="5"
              value={task.effort || ''}
              onChange={(e) => setTask(prev => ({ ...prev, effort: parseInt(e.target.value) }))}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.effort ? 'border-red-500' : ''
              }`}
            />
            {errors.effort && (
              <p className="mt-1 text-sm text-red-600">{errors.effort}</p>
            )}
          </div>
        </div>

        {task.impact && task.effort && (
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Priority Assessment
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Based on the impact/effort ratio, this task has{' '}
              <span className="font-medium capitalize">
                {getPriority(task.impact, task.effort)}
              </span>{' '}
              priority.
            </p>
          </div>
        )}

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Task
        </button>
      </form>
    </div>
  )
} 