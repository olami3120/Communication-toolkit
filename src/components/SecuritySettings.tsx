import { useState } from 'react'

type UserRole = 'admin' | 'manager' | 'team_lead' | 'member'
type Permission = 'read' | 'write' | 'delete' | 'manage'

interface User {
  id: string
  name: string
  email: string
  role: UserRole
  permissions: Permission[]
  lastActive: Date
  isActive: boolean
}

interface SecurityConfig {
  twoFactorEnabled: boolean
  sessionTimeout: number
  passwordPolicy: {
    minLength: number
    requireUppercase: boolean
    requireNumbers: boolean
    requireSpecialChars: boolean
  }
  ipRestrictions: string[]
}

export const SecuritySettings = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin',
      permissions: ['read', 'write', 'delete', 'manage'],
      lastActive: new Date(),
      isActive: true,
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'manager',
      permissions: ['read', 'write', 'manage'],
      lastActive: new Date(),
      isActive: true,
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'team_lead',
      permissions: ['read', 'write'],
      lastActive: new Date(),
      isActive: true,
    },
  ])

  const [securityConfig, setSecurityConfig] = useState<SecurityConfig>({
    twoFactorEnabled: false,
    sessionTimeout: 30,
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
    },
    ipRestrictions: [],
  })

  const [newUser, setNewUser] = useState<Partial<User>>({
    name: '',
    email: '',
    role: 'member',
    permissions: ['read'],
  })

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      alert('Please fill in all required fields')
      return
    }

    const user: User = {
      id: Date.now().toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role as UserRole,
      permissions: newUser.permissions as Permission[],
      lastActive: new Date(),
      isActive: true,
    }

    setUsers(prev => [...prev, user])
    setNewUser({
      name: '',
      email: '',
      role: 'member',
      permissions: ['read'],
    })
  }

  const handleToggleUserStatus = (user: User) => {
    setUsers(prev =>
      prev.map(u =>
        u.id === user.id
          ? { ...u, isActive: !u.isActive }
          : u
      )
    )
  }

  const handleUpdatePermissions = (user: User, permission: Permission) => {
    setUsers(prev =>
      prev.map(u =>
        u.id === user.id
          ? {
              ...u,
              permissions: u.permissions.includes(permission)
                ? u.permissions.filter(p => p !== permission)
                : [...u.permissions, permission],
            }
          : u
      )
    )
  }

  const handleUpdateSecurityConfig = (updates: Partial<SecurityConfig>) => {
    setSecurityConfig(prev => ({ ...prev, ...updates }))
  }

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'manager':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'team_lead':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'member':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Security Settings
      </h2>

      {/* User Management */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          User Management
        </h3>
        
        {/* Add New User */}
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Add New User
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                value={newUser.name}
                onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter user name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter user email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Role
              </label>
              <select
                value={newUser.role}
                onChange={(e) => setNewUser(prev => ({ ...prev, role: e.target.value as UserRole }))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="member">Member</option>
                <option value="team_lead">Team Lead</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Permissions
              </label>
              <div className="space-y-2">
                {(['read', 'write', 'delete', 'manage'] as Permission[]).map(permission => (
                  <label key={permission} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newUser.permissions?.includes(permission)}
                      onChange={(e) => {
                        const permissions = e.target.checked
                          ? [...(newUser.permissions || []), permission]
                          : (newUser.permissions || []).filter(p => p !== permission)
                        setNewUser(prev => ({ ...prev, permissions }))
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300 capitalize">
                      {permission}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <button
            onClick={handleAddUser}
            className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add User
          </button>
        </div>

        {/* User List */}
        <div className="space-y-4">
          {users.map(user => (
            <div
              key={user.id}
              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {user.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {user.email}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <span
                    className={`px-2 py-1 rounded text-sm ${getRoleColor(user.role)}`}
                  >
                    {user.role.replace('_', ' ')}
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={user.isActive}
                      onChange={() => handleToggleUserStatus(user)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
              <div className="mt-2">
                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Permissions
                </h5>
                <div className="flex flex-wrap gap-2">
                  {(['read', 'write', 'delete', 'manage'] as Permission[]).map(permission => (
                    <label
                      key={permission}
                      className={`px-2 py-1 rounded text-sm cursor-pointer ${
                        user.permissions.includes(permission)
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={user.permissions.includes(permission)}
                        onChange={() => handleUpdatePermissions(user, permission)}
                        className="hidden"
                      />
                      {permission}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Configuration */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Security Configuration
        </h3>
        <div className="space-y-6">
          {/* Two-Factor Authentication */}
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  Two-Factor Authentication
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Add an extra layer of security to your account
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={securityConfig.twoFactorEnabled}
                  onChange={(e) => handleUpdateSecurityConfig({ twoFactorEnabled: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          {/* Session Timeout */}
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Session Timeout (minutes)
              </h4>
              <input
                type="number"
                value={securityConfig.sessionTimeout}
                onChange={(e) => handleUpdateSecurityConfig({ sessionTimeout: parseInt(e.target.value) })}
                min="5"
                max="120"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Password Policy */}
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-4">
              Password Policy
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Minimum Length
                </label>
                <input
                  type="number"
                  value={securityConfig.passwordPolicy.minLength}
                  onChange={(e) => handleUpdateSecurityConfig({
                    passwordPolicy: {
                      ...securityConfig.passwordPolicy,
                      minLength: parseInt(e.target.value),
                    },
                  })}
                  min="8"
                  max="32"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={securityConfig.passwordPolicy.requireUppercase}
                    onChange={(e) => handleUpdateSecurityConfig({
                      passwordPolicy: {
                        ...securityConfig.passwordPolicy,
                        requireUppercase: e.target.checked,
                      },
                    })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700 dark:text-gray-300">
                    Require uppercase letters
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={securityConfig.passwordPolicy.requireNumbers}
                    onChange={(e) => handleUpdateSecurityConfig({
                      passwordPolicy: {
                        ...securityConfig.passwordPolicy,
                        requireNumbers: e.target.checked,
                      },
                    })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700 dark:text-gray-300">
                    Require numbers
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={securityConfig.passwordPolicy.requireSpecialChars}
                    onChange={(e) => handleUpdateSecurityConfig({
                      passwordPolicy: {
                        ...securityConfig.passwordPolicy,
                        requireSpecialChars: e.target.checked,
                      },
                    })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700 dark:text-gray-300">
                    Require special characters
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* IP Restrictions */}
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-4">
              IP Restrictions
            </h4>
            <div className="space-y-2">
              {securityConfig.ipRestrictions.map((ip, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={ip}
                    onChange={(e) => {
                      const newIps = [...securityConfig.ipRestrictions]
                      newIps[index] = e.target.value
                      handleUpdateSecurityConfig({ ipRestrictions: newIps })
                    }}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter IP address"
                  />
                  <button
                    onClick={() => {
                      const newIps = securityConfig.ipRestrictions.filter((_, i) => i !== index)
                      handleUpdateSecurityConfig({ ipRestrictions: newIps })
                    }}
                    className="p-2 text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={() => handleUpdateSecurityConfig({
                  ipRestrictions: [...securityConfig.ipRestrictions, ''],
                })}
                className="w-full px-4 py-2 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200"
              >
                Add IP Address
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 