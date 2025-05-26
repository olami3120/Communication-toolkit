import { useState } from 'react'
import { useStore } from '../store'
import { Message } from '../types'
import { v4 as uuidv4 } from 'uuid'

export const MessageClarityMatrix = () => {
  const { addMessage } = useStore()
  const [formData, setFormData] = useState<Partial<Message>>({
    title: '',
    content: '',
    clarity: 5,
    impact: 5,
    urgency: 5,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.title?.trim()) {
      newErrors.title = 'Title is required'
    }
    if (!formData.content?.trim()) {
      newErrors.content = 'Content is required'
    }
    if (formData.clarity && (formData.clarity < 1 || formData.clarity > 10)) {
      newErrors.clarity = 'Clarity must be between 1 and 10'
    }
    if (formData.impact && (formData.impact < 1 || formData.impact > 10)) {
      newErrors.impact = 'Impact must be between 1 and 10'
    }
    if (formData.urgency && (formData.urgency < 1 || formData.urgency > 10)) {
      newErrors.urgency = 'Urgency must be between 1 and 10'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      const newMessage: Message = {
        id: uuidv4(),
        title: formData.title!,
        content: formData.content!,
        clarity: formData.clarity!,
        impact: formData.impact!,
        urgency: formData.urgency!,
        status: 'sent',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      addMessage(newMessage)
      setFormData({
        title: '',
        content: '',
        clarity: 5,
        impact: 5,
        urgency: 5,
      })
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'title' || name === 'content' ? value : Number(value),
    }))
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Message Clarity Matrix
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              errors.title ? 'border-red-500' : ''
            }`}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Message Content
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={4}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              errors.content ? 'border-red-500' : ''
            }`}
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-600">{errors.content}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="clarity"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Clarity (1-10)
            </label>
            <input
              type="range"
              id="clarity"
              name="clarity"
              min="1"
              max="10"
              value={formData.clarity}
              onChange={handleChange}
              className="mt-1 block w-full"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Current: {formData.clarity}
            </p>
            {errors.clarity && (
              <p className="mt-1 text-sm text-red-600">{errors.clarity}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="impact"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Impact (1-10)
            </label>
            <input
              type="range"
              id="impact"
              name="impact"
              min="1"
              max="10"
              value={formData.impact}
              onChange={handleChange}
              className="mt-1 block w-full"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Current: {formData.impact}
            </p>
            {errors.impact && (
              <p className="mt-1 text-sm text-red-600">{errors.impact}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="urgency"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Urgency (1-10)
            </label>
            <input
              type="range"
              id="urgency"
              name="urgency"
              min="1"
              max="10"
              value={formData.urgency}
              onChange={handleChange}
              className="mt-1 block w-full"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Current: {formData.urgency}
            </p>
            {errors.urgency && (
              <p className="mt-1 text-sm text-red-600">{errors.urgency}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Message
          </button>
        </div>
      </form>

      {/* Real-time Preview */}
      <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Preview
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-700 dark:text-gray-300">
              {formData.title || 'Untitled Message'}
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              {formData.content || 'No content yet'}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-500 dark:text-gray-400">Clarity:</span>{' '}
              {formData.clarity}/10
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Impact:</span>{' '}
              {formData.impact}/10
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Urgency:</span>{' '}
              {formData.urgency}/10
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 