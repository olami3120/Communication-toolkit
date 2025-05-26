import { useState } from 'react'
import { useStore } from '../store'

interface TeamMember {
  id: string
  name: string
  role: string
  skills: string[]
  availability: 'available' | 'busy' | 'unavailable'
  currentTask?: string
}

export const TeamCollaboration = () => {
  const { tasks } = useStore()
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [newMember, setNewMember] = useState<Partial<TeamMember>>({
    name: '',
    role: '',
    skills: [],
    availability: 'available',
  })
  const [currentSkill, setCurrentSkill] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateMember = () => {
    const newErrors: Record<string, string> = {}
    
    if (!newMember.name?.trim()) {
      newErrors.name = 'Name is required'
    }
    if (!newMember.role?.trim()) {
      newErrors.role = 'Role is required'
    }
    if (newMember.skills?.length === 0) {
      newErrors.skills = 'At least one skill is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddSkill = () => {
    if (currentSkill.trim() && !newMember.skills?.includes(currentSkill)) {
      setNewMember(prev => ({
        ...prev,
        skills: [...(prev.skills || []), currentSkill.trim()],
      }))
      setCurrentSkill('')
    }
  }

  const handleRemoveSkill = (skill: string) => {
    setNewMember(prev => ({
      ...prev,
      skills: prev.skills?.filter(s => s !== skill) || [],
    }))
  }

  const handleAddMember = () => {
    if (validateMember()) {
      const member: TeamMember = {
        id: crypto.randomUUID(),
        name: newMember.name!,
        role: newMember.role!,
        skills: newMember.skills || [],
        availability: newMember.availability || 'available',
      }
      setTeamMembers(prev => [...prev, member])
      setNewMember({
        name: '',
        role: '',
        skills: [],
        availability: 'available',
      })
    }
  }

  const handleDeleteMember = (id: string) => {
    setTeamMembers(prev => prev.filter(m => m.id !== id))
  }

  const handleUpdateAvailability = (id: string, availability: TeamMember['availability']) => {
    setTeamMembers(prev =>
      prev.map(member =>
        member.id === id ? { ...member, availability } : member
      )
    )
  }

  const handleAssignTask = (memberId: string, taskId: string) => {
    setTeamMembers(prev =>
      prev.map(member =>
        member.id === memberId ? { ...member, currentTask: taskId } : member
      )
    )
  }

  const getAvailabilityColor = (availability: TeamMember['availability']) => {
    switch (availability) {
      case 'available':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
      case 'busy':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
      case 'unavailable':
        return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
    }
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Team Collaboration
      </h2>

      {/* Add New Member Form */}
      <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Add Team Member
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              value={newMember.name}
              onChange={(e) => setNewMember(prev => ({ ...prev, name: e.target.value }))}
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
              Role
            </label>
            <input
              type="text"
              value={newMember.role}
              onChange={(e) => setNewMember(prev => ({ ...prev, role: e.target.value }))}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.role ? 'border-red-500' : ''
              }`}
            />
            {errors.role && (
              <p className="mt-1 text-sm text-red-600">{errors.role}</p>
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
              {newMember.skills?.map((skill) => (
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
            onClick={handleAddMember}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Add Team Member
          </button>
        </div>
      </div>

      {/* Team Members List */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Team Members
        </h3>
        {teamMembers.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            No team members added yet. Add your first team member using the form above.
          </p>
        ) : (
          teamMembers.map((member) => (
            <div
              key={member.id}
              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                    {member.name}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {member.role}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <select
                    value={member.availability}
                    onChange={(e) => handleUpdateAvailability(member.id, e.target.value as TeamMember['availability'])}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getAvailabilityColor(member.availability)}`}
                  >
                    <option value="available">Available</option>
                    <option value="busy">Busy</option>
                    <option value="unavailable">Unavailable</option>
                  </select>
                  <button
                    onClick={() => handleDeleteMember(member.id)}
                    className="text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="mt-2 flex flex-wrap gap-2">
                {member.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {tasks.length > 0 && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Assign Task
                  </label>
                  <select
                    value={member.currentTask || ''}
                    onChange={(e) => handleAssignTask(member.id, e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Select a task</option>
                    {tasks.map((task) => (
                      <option key={task.id} value={task.id}>
                        {task.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
} 