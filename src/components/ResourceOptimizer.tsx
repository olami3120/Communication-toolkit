import { useState } from 'react'
import { useStore } from '../store'

interface Resource {
  id: string
  name: string
  capacity: number
  skills: string[]
  assignedTasks: string[]
}

export const ResourceOptimizer = () => {
  const { tasks } = useStore()
  const [resources, setResources] = useState<Resource[]>([])
  const [newResource, setNewResource] = useState<Partial<Resource>>({
    name: '',
    capacity: 1,
    skills: [],
    assignedTasks: [],
  })
  const [currentSkill, setCurrentSkill] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateResource = () => {
    const newErrors: Record<string, string> = {}
    
    if (!newResource.name?.trim()) {
      newErrors.name = 'Name is required'
    }
    if (newResource.capacity === undefined || newResource.capacity < 1) {
      newErrors.capacity = 'Capacity must be at least 1'
    }
    if (newResource.skills?.length === 0) {
      newErrors.skills = 'At least one skill is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddSkill = () => {
    if (currentSkill.trim() && !newResource.skills?.includes(currentSkill)) {
      setNewResource(prev => ({
        ...prev,
        skills: [...(prev.skills || []), currentSkill.trim()],
      }))
      setCurrentSkill('')
    }
  }

  const handleRemoveSkill = (skill: string) => {
    setNewResource(prev => ({
      ...prev,
      skills: prev.skills?.filter(s => s !== skill) || [],
    }))
  }

  const handleAddResource = () => {
    if (validateResource()) {
      const resource: Resource = {
        id: crypto.randomUUID(),
        name: newResource.name!,
        capacity: newResource.capacity!,
        skills: newResource.skills || [],
        assignedTasks: [],
      }
      setResources(prev => [...prev, resource])
      setNewResource({
        name: '',
        capacity: 1,
        skills: [],
        assignedTasks: [],
      })
    }
  }

  const handleDeleteResource = (id: string) => {
    setResources(prev => prev.filter(r => r.id !== id))
  }

  const calculateWorkload = (resource: Resource) => {
    const assignedTasks = tasks.filter(task => resource.assignedTasks.includes(task.id))
    return assignedTasks.reduce((sum, task) => sum + task.effort, 0)
  }

  const getWorkloadColor = (workload: number, capacity: number) => {
    const ratio = workload / capacity
    if (ratio > 1) return 'text-red-600 dark:text-red-400'
    if (ratio > 0.8) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-green-600 dark:text-green-400'
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Resource Allocation Optimizer
      </h2>

      {/* Add New Resource Form */}
      <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Add New Resource
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              value={newResource.name}
              onChange={(e) => setNewResource(prev => ({ ...prev, name: e.target.value }))}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.name ? 'border-red-500' : ''
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Capacity (1-5)
            </label>
            <input
              type="number"
              min="1"
              max="5"
              value={newResource.capacity || ''}
              onChange={(e) => setNewResource(prev => ({ ...prev, capacity: parseInt(e.target.value) }))}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.capacity ? 'border-red-500' : ''
              }`}
            />
            {errors.capacity && (
              <p className="mt-1 text-sm text-red-600">{errors.capacity}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Skills
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={currentSkill}
                onChange={(e) => setCurrentSkill(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Add a skill"
              />
              <button
                onClick={handleAddSkill}
                className="mt-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Add
              </button>
            </div>
            {errors.skills && (
              <p className="mt-1 text-sm text-red-600">{errors.skills}</p>
            )}
            <div className="mt-2 flex flex-wrap gap-2">
              {newResource.skills?.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                >
                  {skill}
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={handleAddResource}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Add Resource
          </button>
        </div>
      </div>

      {/* Resource List */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Resources
        </h3>
        {resources.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            No resources added yet. Add your first resource using the form above.
          </p>
        ) : (
          resources.map((resource) => {
            const workload = calculateWorkload(resource)
            return (
              <div
                key={resource.id}
                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                      {resource.name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Capacity: {resource.capacity}
                    </p>
                    <p className={`text-sm font-medium ${getWorkloadColor(workload, resource.capacity)}`}>
                      Current Workload: {workload}/{resource.capacity}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteResource(resource.id)}
                    className="text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                  >
                    Delete
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {resource.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
} 